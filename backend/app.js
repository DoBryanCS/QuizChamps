const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const db = require("./firebase");

const PORT = process.env.PORT || 3000;
const quizRouter = require("./routes/quizs");
const { Server } = require("@grpc/grpc-js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/quizs", quizRouter);

app.get("/", async (req, res) => {
  res.send("Welcome on QuizChamp server. API is running.");
});

let leaderboard = new Map();
let users = [];

io.on("connection", (socket) => {
  socket.username = "Anonymous";
  socket.score = 0;

  socket.on("joinRoom", (obj) => {
    socket.join(obj.room);
    socket.username = obj.username;

    leaderboard[socket.username] = {
      username: socket.username,
      score: 0,
    };

    // Get all the socket ids in the room
    const socketIds = io.sockets.adapter.rooms.get(obj.room);
    if (socketIds) {
      // Create an array of users in the room using the socket ids
      const usersInRoom = [...socketIds].map((socketId) => {
        return io.sockets.sockets.get(socketId).username;
      });
      users = usersInRoom;
      console.log(`Users in room ${obj.room}: `, usersInRoom);
    }

    // Send the users in the room to the client in real time
    io.sockets.sockets.forEach((socket) => {
      socket.emit("userJoined", users);
      socket.emit("usersInRoomCount", users.length);
    });

    // When Game is started
    socket.on("startGame", (room) => {
      console.log("Game started");

      const quiz = db.ref("Quiz").child(room);
      let username = "";
      let numQuestions;
      let i = 0;
      let quizName;
      let timer = 11000;
      let score = 1000;
      let userScore = 0;
      let scoreIntervalId;
      let countdownIntervalId;
      let count;

      const socketIds = io.sockets.adapter.rooms.get(obj.room);
      // Loop through all the sockets in the room and emit the start game event
      for (const socketId of socketIds) {
        io.sockets.sockets.get(socketId).emit("gameStarted");
      }

      // When a user sends an answer to the server
      io.sockets.sockets.forEach((socket) => {
        socket.on("sendAnswerToServer", (answer) => {
          answer.isCorrect === true ? (socket.score += score) : socket.score;
          io.emit("responseReceived", answer);
          io.emit("sendScoreToClient", {
            username: answer.username,
            score: score,
            currentScore: userScore,
          });
          leaderboard[socket.username] = {
            username: answer.username,
            score: socket.score,
          };
        });
      });

      // Server sends next question to client every 10 seconds + 1 second for the countdown
      const nextQuestion = (i) => {
        let timer = 11000;

        //Send question to client
        quiz.once("child_added", (snapshot) => {
          quizName = snapshot.key;
          quiz.ref
            .child(quizName)
            .child("Question " + i)
            .on("value", (snapshot) => {
              // console.log(snapshot.val());
              snapshot.val() !== null
                ? io.emit("sendQuestionToClient", snapshot.val())
                : io.emit(
                    "IOExceptionQuestionNotFound",
                    "Given question does not exist"
                  );
            });
        });
        i++;
        count = 10;

        scoreIntervalId = setInterval(() => {
          if (score > 0) {
            score -= 10;
          } else {
            clearInterval(scoreIntervalId);
          }
        }, 100);

        countdownIntervalId = setInterval(function () {
          count--;
          io.emit("sendTimerToClient", count);
          // console.log(count);
          if (count === 0) {
            clearInterval(countdownIntervalId);
            io.emit("timesUp", "timesUp");
            // console.log("Time's up!");
          }
        }, 1000);

        setTimeout(() => {
          quiz.once("value", (snapshot) => {
            numQuestions = snapshot.numChildren();
            // Send leaderboard and go to next question if there are more questions
            if (i + 1 > numQuestions) {
              console.log("game over " + timer);
              setTimeout(() => {
                io.emit("gameOver", "gameOver");
              }, 3000);
              io.emit("sendLeaderboardToClient", leaderboard);
              socket.disconnect();
              return;
            } else {
              // Sending leaderboard and going to next question
              setTimeout(() => {
                io.emit("sendLeaderboardToClient", leaderboard);
                setTimeout(() => {
                  nextQuestion(i);
                }, 8000);
              }, 5000);
              score = 1000;
            }
          });

          // Sort leaderboard
          leaderboard = Object.entries(leaderboard)
            .sort(([, a], [, b]) => b.score - a.score)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

          clearTimeout(countdownIntervalId);
        }, timer);
      };

      nextQuestion(i);
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Logging server activity
  console.log(
    "\x1b[34m%s\x1b[0m",
    "Number of clients : " + io.engine.clientsCount
  );
});

server.listen(PORT, () => {
  console.log(`Mon application roule sur http://localhost:${PORT}/quizs`);
});
