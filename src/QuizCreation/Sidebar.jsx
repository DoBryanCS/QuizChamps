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
              border: "2px solid #1A237E",
              borderRadius: "10px",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "20vh",
            }}
            className="text-sm"
            key={index}
            onClick={() => selectQuestion(question.question, index)}
          >
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              src={questions[index].imageSrc}
              alt="Selected Image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
