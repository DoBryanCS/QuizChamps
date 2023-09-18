import React, { useContext } from "react";
import { FadeIn, SlideInDown, SlideInUp } from "react-animated-components";
import { FadeOut } from "react-animated-components";
import { AppStateContext } from "../contexts/AppState";

const Leaderboard = ({ leaderboard }) => {
  const { username } = useContext(AppStateContext);

  return (
    <section className="bg-gray-900 text-white w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-screen text-center flex-col flex">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent mb-20 sm:text-5xl">
            Leaderboard
          </h1>
          <div className="flex items-end w-full gap-2">
            {/* Third Place */}
            <FadeIn>
              <SlideInUp>
                <div className="flex flex-col">
                  <h1 className="text-3xl">🥉</h1>
                  {leaderboard[2][1] && (
                    <div className="py-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 w-64 rounded-md mt-7">
                      <h1>{leaderboard[2][1].username}</h1>
                      <h1>{leaderboard[2][1].score}</h1>
                    </div>
                  )}
                </div>
              </SlideInUp>
            </FadeIn>
            {/* First Place */}
            <FadeIn>
              <SlideInUp>
                <div className="flex flex-col">
                  <h1 className="text-3xl">🥇</h1>
                  <div className="py-20 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 w-64 rounded-md mt-7">
                    <h1>{leaderboard[0][1].username}</h1>
                    <h1>{leaderboard[0][1].score}</h1>
                  </div>
                </div>
              </SlideInUp>
            </FadeIn>
            {/* Second Place */}
            <FadeIn>
              <SlideInUp>
                <div className="flex flex-col">
                  <h1 className="text-3xl">🥈</h1>
                  {leaderboard[1][1] !== undefined && (
                    <div className="py-10 bg-gradient-to-r from-stone-500 via-stone-400 to-stone-500 w-64 rounded-md mt-7">
                      {" "}
                      <h1>{leaderboard[1][1].username}</h1>
                      <h1>{leaderboard[1][1].score}</h1>
                    </div>
                  )}
                </div>
              </SlideInUp>
            </FadeIn>
          </div>
          {/* Leaderboard for the rest of the players */}
          <div className="grid grid-cols-3 ">
            {leaderboard.map((user, index) => {
              if (index > 2) {
                return (
                  <FadeIn key={user}>
                    <SlideInUp>
                      <div className="grid grid-cold-3 ">
                        <div className="py-2 w-64 rounded-md mt-7 bg-indigo-900">
                          <h1 className="font-bold">{index + 1}</h1>
                          <h1>{user[1].username}</h1>
                          <h1>{user[1].score}</h1>
                        </div>
                      </div>
                    </SlideInUp>
                  </FadeIn>
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
