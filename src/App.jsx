<<<<<<< Updated upstream
=======
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import socket from "./helpers/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identification from "./Identification";
import NoMatch from "./NoMatch";
import Main from "./pages/MainApp";
import { AppStateContext } from "./contexts/AppState";

function App() {
  socket.on("connect", () => {
    // console.log("connected");
  });

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  const [userJoined, setUserJoined] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <AppStateContext.Provider
        value={{ userJoined, setUserJoined, username, setUsername }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Identification" element={<Identification />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AppStateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> Stashed changes
