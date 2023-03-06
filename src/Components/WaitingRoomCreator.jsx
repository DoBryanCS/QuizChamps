import React, { useEffect, useState, useContext } from "react";
import { FadeIn, SlideInDown } from "react-animated-components";
import { FadeOut } from "react-animated-components";
import socket from "../helpers/socket";
import { AppStateContext } from "../contexts/AppState";
import { useParams } from "react-router";

//WaitingRoomCreator est un component accessible seulement au créateur d'un quiz qui lance une partie
const WaitingRoomCreator = () => {
  //Reçoit l'id du quiz en parametre de la route
  const { quizId } = useParams();
  const [users, setUsers] = useState([]);
  const { username } = useContext(AppStateContext);

  useEffect(() => {
    //Envoie au backend la liste des joueurs
    socket.on("userJoined", (data) => {
      setUsers([data]);
    });

    socket.on("gameStarted", () => {
      // setGameStarted(true);
    });
  }, [socket]);
};

const handleStartGame = (e) => {
  socket.emit("startGame", quizId);
  console.log(quizId);
  e.preventDefault();

  return (
    <section class="bg-gray-500 text-white waiting-room w-full">
      {/*Start Game permet à l'hote d'un quiz de commencer le quiz */}
      {users.length > 2 ? (
        <button onClick={(e) => handleStartGame(e)}>Start Game</button>
      ) : (
        <button disabled>Start Game</button>
      )}

      <div class="mx-auto max-w-full-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
        <div class="mx-auto max-w-screen text-center">
          <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">
            Salle d'attente
          </h1>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            Un peu de patience.. L'hote va démarrer la partie.
          </p>

          <div class="mt-8 flex flex-col flex-wrap justify-center gap-1">
            {/*users.map affiche chaque utilisateur qui se connecte pour jouer au quiz */}
            {users.map((userArray) => {
              return userArray.map((user) => {
                console.log(user);
                return (
                  <FadeIn>
                    <SlideInDown>
                      {username === user ? (
                        <h1 className="bg-gradient-to-r py-2 from-indigo-600 via-indigo-500 to-indigo-600 text-white rounded-md">
                          {user}
                        </h1>
                      ) : (
                        <h1 className="bg-gradient-to-r py-1.5 from-indigo-400 via-indigo-300 to-indigo-400 text-white rounded-md ">
                          {user}
                        </h1>
                      )}
                    </SlideInDown>
                  </FadeIn>
                );
              });
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingRoomCreator;
