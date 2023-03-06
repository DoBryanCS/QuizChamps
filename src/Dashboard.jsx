import React from "react";
import { useState, useEffect, useContext } from "react";
import { FaPlay, FaEdit } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { UnContexte } from "./App";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "./contexts/AppState"
import socket from "./helpers/socket";



function Dashboard() {
  const [quizes, setQuizes] = useState(null);
  const serveur = "http://localhost:3000/quizs/";
  var quizlist = [];
  const leContext = useContext(UnContexte);
  const navigate = useNavigate();

  const [room, setRoom] = useState("");
  const { userJoined, setUserJoined } = useContext(AppStateContext);
  const { username, setUsername } = useContext(AppStateContext);

  useEffect(() => {

    const auth = getAuth();
    async function getQuiz(id) {
      let rep = await fetch(`${serveur}/${id}`);
      if (rep.ok) {
        let data = await rep.json();
        //const quizName = Object.keys(data)[0];
        return data;
      } else {
        console.log("Erreur getQuiz");
      }
    }

    async function getQuizs() {
      //console.log(leContext.UID);
      let rep = await fetch(`${serveur}user/${leContext.UID}`);
      if (rep.ok) {
        let data = await rep.json();
        //const quizPromises = Object.keys(data).map((id) => getQuiz(id));
        //const quizList = await Promise.all(quizPromises);
        setQuizes(data);
      } else {
        console.log("Erreur getQuizs");
      }
    }

    async function getData() {
      getQuizs().then(() => console.log("done getQuizs"));
    }

    getData().then(() => console.log("done getData"));
  }, []);

  const handleCreateQuiz = () => {
    navigate("/QuizCreation");
  };

  const handleUpdateQuiz = (id) => {
    navigate(`/QuizModification/${id}`);
  };


  useEffect(() => {
    socket.emit("connection", "Hello from client");
  }, []);

  const handleJoinRoom = (e) => {
    console.log(username)
    console.log(room);
    if (username != "" && room != "") {
      socket.emit("joinRoom", { username, room });
      setUserJoined(true);
      navigate(`/WaitingRoom/${room}`);
    } else {
      alert("Please enter a username and a room");
    }
  };

  const handlePlay = (creator, id) => {
    setRoom(id);
    setUsername(creator);
    handleJoinRoom(id);
  };

  return (
    <div className="relative min-h-screen">
      <div className="p-6">
        <p className="text-4xl font-extrabold py-9 text-white">
          {" "}
          {leContext.Name} - Dashboard
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-lg font-bold font-medium text-gray-700 m-4">My Quizes</h3>
            <div className="grid grid-rows-1 gap-4">
              {quizes &&
                quizes.map((q) => {
                  return (
                    <div
                      key={q["id"]}
                      className="grid grid-cols-6 gap-1 w-200 h-24 bg-slate-100 rounded row-auto shadow-md flex items-center"
                    >
                      <p className="col-span-4 align-middle rounded">
                        {q["quizTitle"]}
                      </p>
                      <button className="align-middle rounded h-12 w-16 bg-slate-200 hover:bg-slate-300 flex items-center px-6"
                        onClick={() => handlePlay(q["creator"], q["id"])}
                      >
                        <FaPlay />
                      </button>
                      <button
                        className="align-middle rounded h-12 w-16 bg-slate-200 hover:bg-slate-300 flex items-center px-6"
                        onClick={() => handleUpdateQuiz(["id"])}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-bold text-lg font-medium text-gray-700 m-4">
              Create a quiz
            </h3>
            <div className="grid grid-rows-1 align-middle justify-center gap-4 h-full">
              <div className="text-sm h-24 align-middle lg:flex-grow">
                <button
                  className="bg-slate-100 shadow-md inline-block h-12 w-32 text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-gray-800 hover:bg-gray-300 mt-4 lg:mt-0"
                  onClick={handleCreateQuiz}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
