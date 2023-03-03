import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "./helpers/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Identification from "./Identification";
import { Menu } from "./Components/Menu";
import NoMatch from "./NoMatch";
import Main from "./pages/MainApp";
import Home from "./Home.jsx";
import { AppStateContext } from "./contexts/AppState";

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

  const [userJoined, setUserJoined] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <UnContexte.Provider value={object}>
        <Menu />
        <AppStateContext.Provider
          value={{ userJoined, setUserJoined, username, setUsername }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Identification" element={<Identification />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </AppStateContext.Provider>
      </UnContexte.Provider>
    </BrowserRouter>
  );
}

export default App;
