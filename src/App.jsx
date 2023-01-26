import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AnswerCard from "./components/AnswerCard";
import socket from "../socket";

function App() {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("sendQuestionToClient", (questionObj) => {
    setQuestion(questionObj);
    console.log(questionObj);
    if (questionObj && questionObj.Answers) {
      setAnswers(questionObj.Answers);
    }
  });

  socket.on("sendScoreToClient", (score) => {
    console.log(score);
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
    // socket.on("responseReceived", (data) => {
    //   console.log(data);
    // })
    socket.on("sendQuestionToClient", (questionObj) => {
      setQuestion(questionObj);
      if (questionObj && questionObj.Answers) {
        setAnswers(questionObj.Answers);
      }
    });
  }, [socket]);

  const handleAnswer = (isCorrect) => {
    console.log(isCorrect);
    socket.emit("sendAnswerToServer", isCorrect);
  };

  return (
    <div className="App">
      <a
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {
            question && question.Question ? question.Question : "Question"
          }
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>
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
    </div>
  );
}

export default App;
