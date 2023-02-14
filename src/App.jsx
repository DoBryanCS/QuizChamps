import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "./helpers/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identification from "./Identification";
import NoMatch from "./NoMatch";
import Main from "./pages/MainApp";

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
          <Route path="/" element={<Main />} />
          <Route path="/Identification" element={<Identification />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
