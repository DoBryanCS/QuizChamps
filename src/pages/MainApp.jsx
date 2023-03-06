import { useState, useEffect, useContext } from "react";
import "../App.css";
import AnswerCard from "../components/AnswerCard";
import "react-circular-progressbar/dist/styles.css";
import AnimatedTexte from "../components/AnimatedText";
import Timer from "../components/Timer";
import socket from "../helpers/socket";
import Leaderboard from "../components/Leaderboard";
import JoinRoom from "../components/JoinRoom";
import { AppStateContext } from "../contexts/AppState";
import WaitingRoom from "../components/WaitingRoom";

function MainApp() {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [playerHasAnswered, setPlayerHasAnswered] = useState(false);
  const { userJoined, setUserJoined } = useContext(AppStateContext);
  const { username, setUsername } = useContext(AppStateContext);
  let idx = -1;

  useEffect(() => {
    socket.emit("connection", "Hello from client");

    socket.on("sendScoreToClient", (score) => {
      // console.log(score);
    });

    socket.on("gameStarted", () => {
      setGameStarted(true);
      console.log("GAME IS STARTED");
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
      console.log(leaderboardObj);
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
      {userJoined ? (
        gameStarted ? (
          <>
            {showTimer && timer > 0 ? (
              <div className="container w-40 h-40">
                <Timer timer={timer} />
              </div>
            ) : showTimeUp ? (
              <AnimatedTexte text={"Temps écoulé !"} />
            ) : null}
            {showLeaderboard &&
            leaderboard !== null &&
            leaderboard.length > 0 ? (
              <Leaderboard leaderboard={leaderboard} />
            ) : (
              <div className=" mt-20 flex justify-center items-center flex-col w-full">
                <div className="container w-full h-full">
                  <img
                    className="object-cover h-48 mx-auto"
                    src={question.imgURL}
                  />
                  <h5 className=" text-2xl mb-20 mt-20 text-white tracking-tight dark:text-white">
                    {question && question.Question ? question.Question : null}
                  </h5>
                </div>

                <div className="grid grid-cols-2 gap-6 w-3/5">
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
          </>
        ) : (
          <WaitingRoom />
        )
      ) : (
        <JoinRoom />
      )}
    </div>
  );
}

export default MainApp;
