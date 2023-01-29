import { useState } from "react";
import Sidebar from "./Sidebar";
import Checkbox from "@mui/material/Checkbox";
import "./QuizCreation.css";

function QuizCreation() {
  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: [
        { text: "", isCorrect: false, disabled: false },
        { text: "", isCorrect: false, disabled: false },
        { text: "", isCorrect: false, disabled: false },
        { text: "", isCorrect: false, disabled: false },
      ],
    },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    index: 0,
  });

  const addQuestion = (event) => {
    event.preventDefault();
    setQuestions(
      questions.concat({
        question: "",
        answers: [
          { text: "", isCorrect: false, disabled: false },
          { text: "", isCorrect: false, disabled: false },
          { text: "", isCorrect: false, disabled: false },
          { text: "", isCorrect: false, disabled: false },
        ],
      })
    );
    setSelectedQuestion.question = "";
    setSelectedQuestion({ question: "", index: questions.length });
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
    setSelectedQuestion({ question: e.target.value, index });
  };

  const selectQuestion = (question, index) => {
    setSelectedQuestion({ question, index });
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].text = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCheckboxChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect =
      !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;
    if (
      updatedQuestions[questionIndex].answers[answerIndex].isCorrect === true
    ) {
      for (let i = 0; i < updatedQuestions[questionIndex].answers.length; i++) {
        if (i !== answerIndex) {
          updatedQuestions[questionIndex].answers[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < updatedQuestions[questionIndex].answers.length; i++) {
        updatedQuestions[questionIndex].answers[i].disabled = false;
      }
    }
    setQuestions(updatedQuestions);
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
            value={selectedQuestion.question}
            onChange={(e) => handleQuestionChange(e, selectedQuestion.index)}
            placeholder="Add your question here"
            className="my-4 p-2 border rounded text-center"
          />
          <div className="answers">
            <textarea
              maxLength="200"
              type="text"
              placeholder="Add answer 1"
              className="textarea my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, selectedQuestion.index, 0)}
              value={questions[selectedQuestion.index].answers[0].text}
            />
            <Checkbox
              disabled={questions[selectedQuestion.index].answers[0].disabled}
              onChange={() => handleCheckboxChange(selectedQuestion.index, 0)}
              checked={questions[selectedQuestion.index].answers[0].isCorrect}
            />
            <textarea
              maxLength="200"
              type="text"
              placeholder="Add answer 2"
              className="textarea my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, selectedQuestion.index, 1)}
              value={questions[selectedQuestion.index].answers[1].text}
            />
            <Checkbox
              disabled={questions[selectedQuestion.index].answers[1].disabled}
              onChange={() => handleCheckboxChange(selectedQuestion.index, 1)}
              checked={questions[selectedQuestion.index].answers[1].isCorrect}
            />
          </div>
          <div className="answers">
            <textarea
              maxLength="200"
              type="text"
              placeholder="Add answer 3"
              className="textarea my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, selectedQuestion.index, 2)}
              value={questions[selectedQuestion.index].answers[2].text}
            />
            <Checkbox
              disabled={questions[selectedQuestion.index].answers[2].disabled}
              onChange={() => handleCheckboxChange(selectedQuestion.index, 2)}
              checked={questions[selectedQuestion.index].answers[2].isCorrect}
            />
            <textarea
              maxLength="200"
              type="text"
              placeholder="Add answer 4"
              className="textarea my-4 p-2 border rounded m-2 text-center"
              onChange={(e) => handleAnswerChange(e, selectedQuestion.index, 3)}
              value={questions[selectedQuestion.index].answers[3].text}
            />
            <Checkbox
              disabled={questions[selectedQuestion.index].answers[3].disabled}
              onChange={() => handleCheckboxChange(selectedQuestion.index, 3)}
              checked={questions[selectedQuestion.index].answers[3].isCorrect}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizCreation;
