import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "./helpers/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identification from "./Identification";
import { Menu } from "./Components/Menu";
import NoMatch from "./NoMatch";
import Main from "./pages/MainApp";

export const UnContexte = React.createContext();

function App() {
  socket.on("connect", () => {
    console.log("connected");
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  const [Modal, setModal] = useState(false);
  const object = { Modal, setModal };

  return (
      <BrowserRouter>
        <UnContexte.Provider value={object}>
          <Menu />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Identification" element={<Identification />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </UnContexte.Provider>
      </BrowserRouter>
  );
}

export default App;