import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "../socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identification from "./Identification";
import { Menu } from "./Components/Menu";
import NoMatch from "./NoMatch";

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
    /**<div className="App">
      <a
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>
    </div>*/
    <div className="bg-indigo-900">
      <BrowserRouter>
        <UnContexte.Provider value={object}>
          <Menu />
          <Routes>
            <Route path="/" element={<NoMatch />} />
            <Route path="/Identification" element={<Identification />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </UnContexte.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;