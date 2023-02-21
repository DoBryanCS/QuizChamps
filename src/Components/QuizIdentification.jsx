import React, { useState, useContext } from "react";
import { UnContexte } from "../App";

const QuizIdentification = () => {
  const [QuizID, setQuizID] = useState("");
  const [Name, setName] = useState("");
  const Context = useContext(UnContexte);

  async function EnterQuiz() {
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QuizID, Name })
      });
      const data = await response.json();
      if (data.success) {
        return data.key;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

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
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0 "
          onClick={() => Context.setModal(false)}
        >
          Close
        </button>
        <button
          className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0  ml-2"
          onClick={EnterQuiz}
        >
          Verify
        </button>
        </form>
      </div>
    </div>
  );
};

export { QuizIdentification };