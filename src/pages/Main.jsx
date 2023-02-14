import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AnswerCard from "./components/AnswerCard";
import "react-circular-progressbar/dist/styles.css";
import AnimatedTexte from "./components/AnimatedText";
import Timer from "./components/Timer";
import socket from "../socket";
import Leaderboard from "./components/Leaderboard";

function Main() {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("HermannCool");
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
      {gameOver ? null : null}
      {showTimer && timer > 0 ? (
        <div className="container w-40 h-40">
          <Timer timer={timer} />
        </div>
      ) : showTimeUp ? (
        <AnimatedTexte text={"Temps écoulé !"} />
      ) : null}
      {showLeaderboard && leaderboard !== null && leaderboard.length > 0 ? (
        <Leaderboard leaderboard={leaderboard} />
      ) : (
        <div className="container mt-20 flex justify-center items-center flex-col w-full">
          {showTimer && (
            <div className="container">
              <img class="object-cover h-48 mx-auto" src={question.imgURL} />
              <h5 class=" text-2xl mb-20 mt-20 tracking-tight text-gray-900 dark:text-white">
                {question && question.Question ? (
                  question.Question
                ) : (
                  <AnimatedTexte
                    text={"Quiz en cours de chargement, veuillez patienter.."}
                  />
                )}
              </h5>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 w-full">
            {answers &&
              showTimer &&
              !playerHasAnswered &&
              Object.entries(answers).map(([answer, isCorrect]) => {
                const cardColors = [
                  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                  "bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500",
                  "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
                  "bg-gradient-to-r from-violet-500 via-blue-500 to-teal-500",
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
        </div>
      )}
    </div>
  );
}

export default Main;
