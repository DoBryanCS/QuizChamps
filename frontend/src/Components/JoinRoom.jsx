import React, { useState, useEffect, useContext } from "react";
import { AppStateContext } from "../contexts/AppState";
import socket from "../helpers/socket";
import { FadeIn, SlideInDown } from "react-animated-components";

const JoinRoom = () => {
  const [room, setRoom] = useState("");
  const { userJoined, setUserJoined } = useContext(AppStateContext);
  const { username, setUsername } = useContext(AppStateContext);

  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (username != "" && room != "") {
      socket.emit("joinRoom", { username, room });
      setUserJoined(true);
    } else {
      alert("Please enter a username and a room");
    }
  };

  // Join room form
  return (
    <div className="container flex flex-col justify-items-center items-center content-center">
      <FadeIn>
        <SlideInDown>
          <h1 className="bg-gradient-to-r mb-6 from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent mb-10 sm:text-5xl">
            Join Room
          </h1>
        </SlideInDown>
      </FadeIn>
      <form className="w-96  justify-items-center items-center">
        <div className="mb-6">
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            id="room"
            placeholder="Code du salon"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleJoinRoom}
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
        >
          Rejoindre
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;
