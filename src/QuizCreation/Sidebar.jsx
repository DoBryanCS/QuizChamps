import { useRef, useEffect } from "react";

function Sidebar({ questions, selectQuestion }) {
  const lastQuestionRef = useRef();

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  return (
    <div style={{ overflowY: "scroll" }}>
      <ul>
        {questions.map((question, index) => (
          <li
            ref={index === questions.length - 1 ? lastQuestionRef : null}
            style={{
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="text-sm"
            key={index}
            onClick={() => selectQuestion(question, index)}
          >
            Question {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
