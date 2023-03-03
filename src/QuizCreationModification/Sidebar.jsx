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
  // useRef hook to get a reference to the last question
  const lastQuestionRef = useRef();

  // useEffect hook to scroll to the last question when a new question is added
  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  // function to handle deleting a question
  const handleDelete = (index, event) => {
    event.stopPropagation();

    // create a copy of the questions array
    const updatedQuestions = [...questions];

    // remove the question at the specified index
    updatedQuestions.splice(index, 1);

    // update the questions state with the updatedQuestions array
    setQuestions(updatedQuestions);

    // if the deleted question was the selected question, select the previous question
    if (selectedQuestion === index && questions.length > 1) {
      selectQuestion(updatedQuestions[index - 1].question, index - 1);
    }
    // if the deleted question was before the selected question, update the selected question index to account for the removed question
    else if (selectedQuestion > index) {
      selectQuestion(updatedQuestions[index].question, index);
    }
  };

  return (
    // div that contains the question list with a scrollbar
    <div className="scrollbar">
      <ul className="list">
        {questions.map((question, index) => (
          // li element that represents each question
          <li
            // set a ref for the last question in the list
            ref={index === questions.length - 1 ? lastQuestionRef : null}
            // set styles for the selected question
            style={{
              border: selectedQuestion === index ? "2px solid #6949ff" : "",
              borderRadius: selectedQuestion === index ? "10px" : "",

              backgroundColor: !questions[index].imageSrc
                ? "#f0eded"
                : "#f0eded",
              position: "relative",
            }}
            className="text-sm"
            key={index}
            // click handler to select the question
            onClick={() => selectQuestion(question.question, index)}
          >
            <DeleteIcon
              // click handler to delete the question
              onClick={(event) => handleDelete(index, event)}
              className="deleteIcon"
            />

            <div className="square">
              <div
                style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}
              >
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
