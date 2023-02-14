import React from "react";
import { FadeIn, SlideInDown } from "react-animated-components";
import { FadeOut } from "react-animated-components";

const Leaderboard = ({ leaderboard }) => {
  return (
    // <div className="container">
    //   Leaderboard
    //   {leaderboard.map((user) => {
    //     return (
    //       <FadeIn>
    //         <SlideInDown>
    //           <h1>{user[1].username}</h1>
    //           <h1>{user[1].score}</h1>
    //           <br />
    //         </SlideInDown>
    //       </FadeIn>
    //     );
    //   })}
    // </div>
    <section class="bg-gray-900 text-white w-full">
      <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div class="mx-auto max-w-screen text-center">
          <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Leaderboard
          </h1>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            L'histoire est écrite par les vainqueurs. Qui sera le prochain ?
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            {leaderboard.map((user) => {
              return (
                <FadeIn>
                  <SlideInDown>
                    <h1>{user[1].username}</h1>
                    <h1 className="mb-5">{user[1].score}</h1>
                  </SlideInDown>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
