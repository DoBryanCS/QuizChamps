import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "../socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Menu } from "./Components/Menu";
import NoMatch from "./NoMatch";
import Home from "./Home.jsx";
import QuizCreation from "./QuizCreationModification/QuizCreation";
import QuizModification from "./QuizCreationModification/QuizModification";

export const UnContexte = React.createContext();

function App() {
  socket.on("connect", () => {
    console.log("connected");
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  const [Modal, setModal] = useState(false);
  const [identifyModal, setIdentifyModal] = useState(false);
  const [UID, setUID] = useState("");
  const [Name, setName] = useState("");
  const object = {
    Modal,
    setModal,
    identifyModal,
    setIdentifyModal,
    UID,
    setUID,
    Name,
    setName,
  };

  return (
    <div className="min-h-screen">
      <UnContexte.Provider value={object}>
        {object.UID !== "" && (
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="bg-indigo-900">
                    <Home />
                  </div>
                }
              />
              <Route
                path="/Dashboard"
                element={
                  <div className="bg-indigo-900">
                    <Dashboard />
                  </div>
                }
              />
              <Route
                path="/quizCreation"
                element={
                  <div className="bg-indigo-900">
                    <QuizCreation />
                  </div>
                }
              />
              <Route
                path="/quizModification/:id"
                element={
                  <div className="bg-indigo-900">
                    <QuizModification />
                  </div>
                }
              />
              <Route
                path="*"
                element={
                  <div className="bg-indigo-900">
                    <NoMatch />
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        )}
        {object.UID === "" && (
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="bg-indigo-900">
                    <Home />
                  </div>
                }
              />
              <Route
                path="*"
                element={
                  <div className="bg-indigo-900">
                    <NoMatch />
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        )}
      </UnContexte.Provider>
    </div>
  );
}

export default App;
