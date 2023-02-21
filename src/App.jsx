import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "../socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizCreation from "./QuizCreation/QuizCreation";

function App() {
  socket.on("connect", () => {
    console.log("connected");
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quizCreation" element={<QuizCreation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
