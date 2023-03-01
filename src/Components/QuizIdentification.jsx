import React, { useState, useContext, useEffect } from "react";
import { UnContexte } from "../App";
//import { serveur, serveur } from "../../constent";
import { useNavigate } from "react-router-dom";

const QuizIdentification = () => {
  const Context = useContext(UnContexte);
  const [QuizID, setQuizID] = useState("34778655");
  const [Name, setName] = useState("Eusebe");
  const [Error, setError] = useState("");
  const navigate = useNavigate();
  const serveur = `http://localhost:3000/quizs/${QuizID}`;

  useEffect(() => {
    setError("");
  }, [QuizID, Name]);

  const checkQuizExists = async () => {
    const quizId = QuizID;
    try {
      const response = await fetch(`${serveur}`);
      console.log(response);
      if (response.ok) {
        console.log(await response.json());
        console.log("quiz exists");
        return true;
      } else {
        console.log("quiz does not exist");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const joinQuiz = async (e) => {
    e.preventDefault();
    const quizId = QuizID;
    const username = Name;
    const quizExists = await checkQuizExists(quizId);
    if (!quizExists) {
      // Display an error message to the user
      setError("Quiz does not exist");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/join-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId, username }),
      });
      //navigate(`/Dashboard`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        Context.setModal(false);
        navigate(`/Dashboard`);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred");
    }
  };
  

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg">
        <form className="pb-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              QuizID
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="QuizID"
              value={QuizID}
              required
              onChange={(e) => setQuizID(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="Name"
              value={Name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          { Error && <p className="text-red-500">{Error}</p> }
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0 "
            onClick={() => Context.setModal(false)}
          >
            Close
          </button>
          <button
            className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0  ml-2"
            onClick={joinQuiz}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export { QuizIdentification };
