import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AnswerCard from "./components/AnswerCard";
import "react-circular-progressbar/dist/styles.css";
import TimeUp from "./components/TimeUp";
import Timer from "./components/Timer";

import socket from "../socket";

function App() {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("Heyy");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [playerHasAnswered, setPlayerHasAnswered] = useState(false);
  let idx = -1;

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
      setShowLeaderboard(false);
      setShowTimer(true);
      if (questionObj && questionObj.Answers) {
        function shuffleObject(questionObj) {
          let shuffled = {};
          let keys = Object.keys(questionObj.Answers);
          keys.sort(function () {
            return 0.5 - Math.random();
          });
          for (let i = 0; i < keys.length; i++) {
            shuffled[keys[i]] = questionObj.Answers[keys[i]];
          }
          console.log(shuffled);
          setAnswers(shuffled);
          setPlayerHasAnswered(false);
        }
        shuffleObject(questionObj);
      }
    });
    socket.on("gameOver", (score) => {
      setGameOver(true);
      console.log("Game Over");
      // console.log(score);
    });

    socket.on("timesUp", (score) => {
      setShowTimer(false);
      setShowTimeUp(true);
      console.log("Times up");
    });

    socket.on("sendLeaderboardToClient", (leaderboardObj) => {
      setLeaderboard(Object.entries(leaderboardObj));
      setShowLeaderboard(true);
      setShowTimeUp(false);
      // console.log(leaderboardObj);
      leaderboard.forEach((user) => {
        console.log(user);
      });
    });

    socket.on("sendTimerToClient", (time) => {
      setTimer(time);
    });
  }, []);

  const handleAnswer = (isCorrect) => {
    setPlayerHasAnswered(true);
    socket.emit("sendAnswerToServer", {
      username: username,
      isCorrect: isCorrect,
    });
  };

  return (
    <div className="App">
      {gameOver ? <h1>Game Over</h1> : null}
      {
        showTimer && timer > 0 ? (
          <div className="container w-40">
            <Timer timer={timer} />
          </div>
        ) : showTimeUp ? (
          <TimeUp text={"Temps écoulé !"} />
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
          {showTimer && (
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {question && question.Question
                ? question.Question
                : "Waiting for question to be initialized.."}
            </h5>
          )}

          <div className="grid grid-cols-2 gap-6">
            {answers &&
              showTimer &&
              !playerHasAnswered &&
              Object.entries(answers).map(([answer, isCorrect]) => {
                const cardColors = [
                  "bg-teal",
                  "bg-indigo",
                  "bg-green",
                  "bg-red",
                ];
                idx++;
                return (
                  <AnswerCard
                    answer={answer}
                    color={cardColors[idx]}
                    isCorrect={isCorrect}
                    myFunc={() => handleAnswer(isCorrect)}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
