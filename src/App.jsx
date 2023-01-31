import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AnswerCard from "./components/AnswerCard";
import socket from "../socket";

function App() {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("Heyy");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timer, setTimer] = useState(0);

  socket.on("sendQuestionToClient", (questionObj) => {
    setQuestion(questionObj);
    // console.log(questionObj);
    if (questionObj && questionObj.Answers) {
      setAnswers(questionObj.Answers);
    }
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");

    socket.on("sendScoreToClient", (score) => {
      // console.log(score);
    });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("sendQuestionToClient", (questionObj) => {
      setQuestion(questionObj);
      if (questionObj && questionObj.Answers) {
        setAnswers(questionObj.Answers);
      }
    });
    socket.on("gameOver", (score) => {
      setGameOver(true);
      console.log("Game Over");
      // console.log(score);
    });

    socket.on("sendLeaderboardToClient", (leaderboardObj) => {
      setLeaderboard(Object.entries(leaderboardObj));
      setShowLeaderboard(true);
      // console.log(leaderboardObj);
      leaderboard.forEach((user) => {
        console.log(user);
      });
    });

    socket.on("sendTimerToClient", (time) => {
      // console.log(time);
      setTimer(time);
    });
  }, []);

  const handleAnswer = (isCorrect) => {
    // console.log(isCorrect);
    // socket.emit("sendAnswerToServer", isCorrect);
    socket.emit("sendAnswerToServer", {
      username: username,
      isCorrect: isCorrect,
    });
  };

  return (
    <div className="App">
      {gameOver ? <h1>Game Over</h1> : null}
      {
        // convert timer to minutes and seconds
        timer > 0 ? (
          <h1>
            {Math.floor(timer / 1000)}:{timer % 100}
            {/* {Math.floor(timer / 1000)} */}
          </h1>
        ) : null
      }
      {showLeaderboard && leaderboard !== null && leaderboard.length > 0 ? (
        <div>
          <h1>Leaderboard</h1>
          {leaderboard.map((user) => {
            return (
              <>
                <h1>{user[1].username}</h1>
                <h1>{user[1].score}</h1>
                <br />
              </>
            );
          })}
        </div>
      ) : (
        <>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {question && question.Question ? question.Question : "Question"}
          </h5>

          {answers &&
            Object.entries(answers).map(([answer, isCorrect]) => {
              return (
                <AnswerCard
                  answer={answer}
                  isCorrect={isCorrect}
                  myFunc={() => handleAnswer(isCorrect)}
                />
              );
            })}
        </>
      )}
    </div>
  );
}

export default App;
