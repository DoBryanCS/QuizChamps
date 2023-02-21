import { useRef, useEffect } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import "./QuizCreation.css";

function Sidebar({
  questions,
  selectQuestion,
  selectedQuestion,
  setQuestions,
}) {
  const lastQuestionRef = useRef();

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  const handleDelete = (index, event) => {
    event.stopPropagation();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    if (selectedQuestion === index) {
      selectQuestion(updatedQuestions[index - 1].question, index - 1);
    }
  };

  return (
    <div className="scrollbar">
      <ul className="list">
        {questions.map((question, index) => (
          <li
            ref={index === questions.length - 1 ? lastQuestionRef : null}
            style={{
              border: selectedQuestion === index ? "2px solid #6949ff" : "",
              borderRadius: selectedQuestion === index ? "10px" : "",

              backgroundColor: !questions[index].imageSrc ? "#f0eded" : "",
              position: "relative",
            }}
            className="text-sm"
            key={index}
            onClick={() => selectQuestion(question.question, index)}
          >
            {index != 0 ? (
              <DeleteIcon
                onClick={(event) => handleDelete(index, event)}
                className="deleteIcon"
              />
            ) : (
              ""
            )}
            <div className="square">
              <div style={{ fontSize: "10px", color: "white" }}>
                {index + 1}
              </div>
            </div>

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
