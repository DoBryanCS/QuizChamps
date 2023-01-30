import { useRef, useEffect } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./QuizCreation.css";

function Sidebar({ questions, selectQuestion }) {
  const lastQuestionRef = useRef();

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  return (
    <div className="scrollbar">
      <ul className="list">
        {questions.map((question, index) => (
          <li
            ref={index === questions.length - 1 ? lastQuestionRef : null}
            style={{
              backgroundColor: !questions[index].imageSrc ? "#f0eded" : "",
            }}
            className="text-sm"
            key={index}
            onClick={() => selectQuestion(question.question, index)}
          >
            {questions[index].imageSrc ? (
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                src={questions[index].imageSrc}
                alt="Selected Image"
              />
            ) : (
              <div style={{ color: "#6949FF" }}>
                <InsertPhotoIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
