import React from "react";

// Component pour afficher une carte de réponse
const AnswerCard = ({ answer, color, myFunc }) => {

  const cardClassName = `block p-6 ${color}  rounded-lg w-full pt-10 pb-10 text-xl shadow hover:${color}-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`;
  return (
    <div onClick={() => myFunc()}>
      <a href="#" className={cardClassName}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
          {answer}
        </h5>
      </a>
    </div>
  );
};

export default AnswerCard;
