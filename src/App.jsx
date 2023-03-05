import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "./helpers/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Menu } from "./Components/Menu";
import NoMatch from "./NoMatch";
import Main from "./pages/MainApp";
import Home from "./Home.jsx";
import QuizCreation from "./QuizCreationModification/QuizCreation";
import QuizModification from "./QuizCreationModification/QuizModification";
import { AppStateContext } from "./contexts/AppState";

export const UnContexte = React.createContext();

function App() {
  socket.on("connect", () => {
    console.log("connected");
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  // Ici on va créer un contexte pour gérer les modales
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

  // Ici on va créer un contexte pour gérer les modales du quiz
  const [userJoined, setUserJoined] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <UnContexte.Provider value={object}>
          <Menu />
          <AppStateContext.Provider
            value={{ userJoined, setUserJoined, username, setUsername }}
          >
            <Routes>
              {UID !== "" ? (
                <>
                  <Route
                    path="/Dashboard"
                    element={
                      <div className="bg-indigo-900">
                        <Dashboard />
                      </div>
                    }
                  />
                  <Route
                    path="/QuizCreation"
                    element={
                      <div className="bg-indigo-900">
                        <QuizCreation />
                      </div>
                    }
                  />
                  <Route
                    path="/QuizModification/:id"
                    element={
                      <div className="bg-indigo-900">
                        <QuizModification />
                      </div>
                    }
                  />
                </>
              ) : null}
              <Route
                path="*"
                element={
                  <div className="bg-indigo-900">
                    <NoMatch />
                  </div>
                }
              />
              <Route path="/" element={<Main />} />
            </Routes>
          </AppStateContext.Provider>
        </UnContexte.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
