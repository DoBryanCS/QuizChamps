import React from "react";

const AnswerCard = ({ answer, color, myFunc }) => {
  // const cardColors = ["bg-teal", "bg-indigo", "bg-green", "bg-red"];
  // let color = cardColors[(Math.random() * cardColors.length) | 0];

  const cardClassName = `block p-6 ${color}-500 border rounded-lg w-full pt-10 pb-10 text-xl shadow hover:${color}-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`;
  return (
    <div onClick={() => myFunc()}>
      <a href="#" class={cardClassName}>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
          {answer}
        </h5>
      </a>
    </div>
  );
};

export default AnswerCard;
