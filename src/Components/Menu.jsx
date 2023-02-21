import React, { useState, useContext } from "react";
import { QuizIdentification } from "./QuizIdentification";
import { UnContexte } from "../App";

const Menu = () => {
  const Context = useContext(UnContexte);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-900 p-4  rounded-lg">
      <div className="text-white text-2xl font-medium">Menu</div>
      <nav className="flex">
        <a className="text-gray-500 hover:text-white mx-4" href="#">
          Home
        </a>
        <a className="text-gray-500 hover:text-white mx-4" href="#">
          About
        </a>
        <a className="text-gray-500 hover:text-white mx-4" href="#">
          Contact
        </a>
      {Context.Modal && (
        <div>
          <QuizIdentification />
        </div>
      )}
      </nav>
      <button
        className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
        onClick={() => Context.setModal(true)}
      >
        Enter Quiz
      </button>
    </div>
  );
};

export { Menu };