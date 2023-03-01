import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "../socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identification from "./Identification";
import Dashboard from "./Dashboard";
import { Menu } from "./Components/Menu";
import NoMatch from "./NoMatch";
import Home from "./Home.jsx";     
//import QuizCreation from "./QuizCreationModification/QuizCreation";
//import QuizModification from "./QuizCreationModification/QuizModification";   

export const UnContexte = React.createContext();

function App() {
  socket.on("connect", () => {
    console.log("connected");
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  const [Modal, setModal] = useState(false);
  const [UID, setUID] = useState("");
  const [Name, setName] = useState("");
  const object = { Modal, setModal, UID, setUID, Name, setName };

  return (
    <div className="bg-indigo-900">
      <UnContexte.Provider value={object}>
        {
          object.UID !== '' &&
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/quizCreation" element={<Home />} />
              <Route path="/quizModification/:id" element={<Home />} />
              <Route path="/Identification" element={<Identification />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        }
         {
          object.UID === '' &&
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Identification" element={<Identification />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        }
      </UnContexte.Provider>
    </div>
  );
}

export default App;