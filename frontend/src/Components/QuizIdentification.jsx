import React, { useState, useContext, useEffect } from "react";
import { UnContexte } from "../App";
//import { serveur, serveur } from "../../constent";
import { useNavigate } from "react-router-dom";

const QuizIdentification = () => {
  const Context = useContext(UnContexte);
  const [QuizID, setQuizID] = useState("");
  const [Name, setName] = useState(Context.Name);
  const [Error, setError] = useState("");
  const navigate = useNavigate();
  const serveur = `http://localhost:3000/quizs/${QuizID}`;

  // useEffect pour gerer les erreurs
  useEffect(() => {
    setError("");
  }, [QuizID, Name]);

  // fonction pour verifier si le quiz existe -- Abandonné
  /**const checkQuizExists = async () => {
    const quizId = QuizID;
    try {
      const response = await fetch(`${serveur}`);
      console.log(response);
      const data = await response.json();
      if (response.ok && data !== null) {
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
  };*/

  // fonction pour rejoindre le quiz -- Abandonné
  /**const joinQuiz = async (e) => {
    e.preventDefault();
    const quizExists = await checkQuizExists(QuizID);
    if (!quizExists) {
      // Display an error message to the user
      setError("Quiz does not exist");
      return;
    } else {
      setError("");
    }*/
  /**try {
      const response = await fetch("http://localhost:3000/join-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ QuizID, Name }),
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
  };*/

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-blur-sm z-10">
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
              //onChange={(e) => setQuizID(e.target.value)} -- Abandonné
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
          {Error && <p className="text-red-500">{Error}</p>}
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0 "
            //onClick={() => Context.setModal(false)} -- Abandonné
          >
            Close
          </button>
          <button
            className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0  ml-2"
            //onClick={joinQuiz} -- Abandonné
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export { QuizIdentification };
