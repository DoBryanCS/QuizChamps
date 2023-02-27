import React, { useState, useContext } from "react";
import { QuizIdentification } from "./QuizIdentification";
import { UnContexte } from "../App";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  
  const Context = useContext(UnContexte);
  const navigate = useNavigate();

  // Function logout with google
  const handleSignOut = () => {
    try {
      auth.signOut();
      Context.setUID("");
      Context.setName("");
      //navigate('/Identification');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-900 p-4  rounded-lg">
      <div className="text-white text-2xl font-medium">Menu</div>
      <nav className="flex">
        <Link to="/" className="text-gray-500 hover:text-white mx-4">
          Home
        </Link>
        {Context.UID == "" && (
          <Link
            to="/identification"
            className="text-gray-500 hover:text-white mx-4"
          >
            Login
          </Link>
        )}
      </nav>
      <div>
        <button
          className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
          onClick={() => Context.setModal(true)}
        >
          Enter Quiz
        </button>
        {Context.UID !== "" && (
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
            onClick={handleSignOut}
          >
            Logout
          </button>
        )}
      </div>
      {Context.Modal && (
        <div>
          <QuizIdentification />
        </div>
      )}
    </div>
  );
};

export { Menu };
