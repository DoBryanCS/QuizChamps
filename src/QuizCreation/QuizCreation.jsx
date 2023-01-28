import { useState } from "react";
import Sidebar from "./Sidebar";
import Checkbox from "@mui/material/Checkbox";

function QuizCreation() {
  const [questions, setQuestions] = useState(["Question 1"]);
  const [question, setQuestion] = useState("Question 1");
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "Question 1",
    index: 0,
  });
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false, disabled: false },
    { text: "", isCorrect: false, disabled: false },
    { text: "", isCorrect: false, disabled: false },
    { text: "", isCorrect: false, disabled: false },
  ]);

  const addQuestion = (event) => {
    event.preventDefault();
    setQuestions(questions.concat(""));
    setQuestion("");
    setSelectedQuestion({ question: "", index: questions.length });
  };

  const handleChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = e.target.value;
    setQuestions(updatedQuestions);
    setQuestion(e.target.value);
  };
  const selectQuestion = (question, index) => {
    setSelectedQuestion({ question, index });
    setQuestion(question);
  };

  const handleAnswerChange = (e, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleCheckboxChange = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    if (updatedAnswers[index].isCorrect === true) {
      for (let i = 0; i < updatedAnswers.length; i++) {
        if (i !== index) {
          updatedAnswers[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < updatedAnswers.length; i++) {
        updatedAnswers[i].disabled = false;
      }
    }
    setAnswers(updatedAnswers);
  };

  const saveQuestions = () => {
    console.log(questions);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "20% 80%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: "80% 20%",
          height: "100vh",
        }}
      >
        <Sidebar questions={questions} selectQuestion={selectQuestion} />
        <div style={{ display: "grid", placeContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={addQuestion}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
      <div>
        <form
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            style={{ width: "80%" }}
            value={question}
            onChange={(e) => handleChange(e, selectedQuestion.index)}
            placeholder="Add your question here"
            className="my-4 p-2 border rounded text-center"
          />
          <div
            style={{
              width: "100%",
              height: "30%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <textarea
              maxlength="200"
              type="text"
              style={{
                width: "40%",
                height: "60%",
                overflow: "hidden",
                resize: "none",
              }}
              placeholder="Add answer 1"
              className="my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, 0)}
              value={answers[0].text}
            />
            <Checkbox
              disabled={answers[0].disabled}
              onChange={() => handleCheckboxChange(0)}
              checked={answers[0].isCorrect}
            />
            <textarea
              maxlength="200"
              type="text"
              style={{
                width: "40%",
                height: "60%",
                overflow: "hidden",
                resize: "none",
              }}
              placeholder="Add answer 2"
              className="my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, 1)}
              value={answers[1].text}
            />
            <Checkbox
              disabled={answers[1].disabled}
              onChange={() => handleCheckboxChange(1)}
              checked={answers[1].isCorrect}
            />
          </div>
          <div
            style={{
              width: "100%",
              height: "30%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <textarea
              maxlength="200"
              type="text"
              style={{
                width: "40%",
                height: "60%",
                overflow: "hidden",
                resize: "none",
              }}
              placeholder="Add answer 3"
              className="my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, 2)}
              value={answers[2].text}
            />
            <Checkbox
              disabled={answers[2].disabled}
              onChange={() => handleCheckboxChange(2)}
              checked={answers[2].isCorrect}
            />
            <textarea
              maxlength="200"
              type="text"
              style={{
                width: "40%",
                height: "60%",
                overflow: "hidden",
                resize: "none",
              }}
              placeholder="Add answer 4"
              className="my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, 3)}
              value={answers[3].text}
            />
            <Checkbox
              disabled={answers[3].disabled}
              onChange={() => handleCheckboxChange(3)}
              checked={answers[3].isCorrect}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizCreation;
