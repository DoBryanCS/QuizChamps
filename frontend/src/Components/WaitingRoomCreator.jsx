import React, { useEffect, useState, useContext } from "react";
import { FadeIn, SlideInDown } from "react-animated-components";
import { FadeOut } from "react-animated-components";
import socket from "../helpers/socket";
import { AppStateContext } from "../contexts/AppState";
import { useParams } from "react-router";

//WaitingRoomCreator est un component accessible seulement au créateur d'un quiz qui lance une partie
const WaitingRoomCreator = () => {
  //Reçoit l'id du quiz en parametre de la route
  const [users, setUsers] = useState([]);
  const { username } = useContext(AppStateContext);
    //Reçoit l'id du quiz en parametre de la route
    const { id } = useParams();
    
    const [isDisabled, setisDisabled] = useState(true);

  useEffect(() => {
        //Envoie au backend la liste des joueurs
        socket.on("userJoined", (data) => {
            setUsers([data]);
            if (data.length > 2) {
                setisDisabled(false)
            }
        });socket.on("gameStarted", () => {
          // setGameStarted(true);
      });
  }, [socket, users]);


  const handleStartGame = (e) => {
    socket.emit("startGame", id);
    e.preventDefault();
    console.log('Start game')
}

  return (
    <section className="bg-gray-900 text-white waiting-room w-full">
      {/*Start Game permet à l'hote d'un quiz de commencer le quiz */}
      {isDisabled ? (
        <button disabled>Waiting for more players</button>
      ) : (
        <button onClick={(e) => handleStartGame(e)}>Start Game</button>
      )}
        
        <div className="mx-auto max-w-full-xl px-4 lg:flex lg:h-full lg:items-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">
            {id}
          </h1>
        </div>

      <div className="mx-auto max-w-full-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
        <div className="mx-auto max-w-screen text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">
            Salle d'attente
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            Un peu de patience.. L'hote va démarrer la partie.
          </p>
    

          <div className="mt-8 flex flex-col flex-wrap justify-center gap-1">
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
