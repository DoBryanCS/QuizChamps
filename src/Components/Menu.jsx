import React, { useState, useContext } from "react";
import { QuizIdentification } from "./QuizIdentification";
import { UnContexte } from "../App";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Identification } from "../Identification";

const Menu = () => {
  const Context = useContext(UnContexte);
  const navigate = useNavigate();

  // Function logout with google
  const handleSignOut = (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      auth.signOut();
      Context.setUID("");
      Context.setName("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-900 p-4">
      <div
        className="text-white text-2xl font-medium cursor-pointer"
        onClick={() => navigate("/")}
      >
        QuizChamp
      </div>

      <div>
        {Context.UID == "" && (
          <button
            className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
            onClick={() => Context.setIdentifyModal(true)}
          >
            Login/Signup
          </button>
        )}
        <button
          className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
          onClick={() => Context.setModal(true)}
        >
          Enter Quiz
        </button>

        {Context.UID !== "" && (
          <>
            <button
              className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              onClick={() => navigate("/Dashboard")}
            >
              Dashboard
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </>
        )}
      </div>
      {Context.Modal && (
        <div>
          <QuizIdentification />
        </div>
      )}
      {Context.identifyModal && (
        <div>
          <Identification />
        </div>
      )}
    </div>
  );
};

export { Menu };
