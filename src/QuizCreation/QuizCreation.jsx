import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Checkbox from "@mui/material/Checkbox";
import QuizCreationModal from "./QuizCreationModal";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./QuizCreation.css";
import SettingsIcon from "@mui/icons-material/Settings";

function QuizCreation() {
  const [showPopup, setShowPopup] = useState(true);

  const fileInputRef = useRef(null);
  const [questions, setQuestions] = useState([
    {
      question: "",
      image: "",
      imageSrc: null,
      showText: true,
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
        image: "",
        imageSrc: null,
        showText: true,
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

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const newQuestions = [...questions];
      const imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      newQuestions[selectedQuestion.index].imageSrc = objectUrl;
      newQuestions[selectedQuestion.index].showText = false;
      newQuestions[selectedQuestion.index].image = imageFile;
      setQuestions(newQuestions);
    } else {
      const newQuestions = [...questions];
      newQuestions[selectedQuestion.index].image = "";
      newQuestions[selectedQuestion.index].imageSrc = null;
      newQuestions[selectedQuestion.index].showText = true;
      setQuestions(newQuestions);
    }
  };

  const removeLastTwoAnswers = (event) => {
    event.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestion.index].answers.pop();
    updatedQuestions[selectedQuestion.index].answers.pop();
    setQuestions(updatedQuestions);
  };

  const addLastTwoAnswers = (event) => {
    event.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestion.index].answers.push({
      text: "",
      isCorrect: false,
      disabled: false,
    });
    updatedQuestions[selectedQuestion.index].answers.push({
      text: "",
      isCorrect: false,
      disabled: false,
    });
    setQuestions(updatedQuestions);
  };

  const saveQuestions = () => {
    console.log(questions);
  };

  return (
    <div>
      <div>
        <QuizCreationModal
          show={showPopup}
          setShow={setShowPopup}
        ></QuizCreationModal>
      </div>

      <div
        className="grid-container"
        style={{ pointerEvents: showPopup ? "none" : "" }}
      >
        <div className="grid-container2">
          <Sidebar
            questions={questions}
            selectQuestion={selectQuestion}
            selectedQuestion={selectedQuestion.index}
            setQuestions={setQuestions}
          />
          <div
            className="addquestion"
            style={{ display: "grid", placeContent: "center" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="addSettings">
                <button
                  style={{
                    backgroundColor: "#6949FF",
                    border: "2px solid #6949FF",
                    borderRadius: "15px",
                    boxShadow: "10px 10px 10px #888888",
                    marginRight: "10px",
                  }}
                  onClick={addQuestion}
                  className="text-white p-4 rounded"
                >
                  +
                </button>
                <SettingsIcon
                  style={{ color: "#888888", height: "50%", width: "50%" }}
                  onClick={() => setShowPopup(true)}
                >
                  Settings
                </SettingsIcon>
              </div>
            </div>
          </div>
        </div>
        {questions[selectedQuestion.index] !== undefined && (
          <div>
            <form
              style={{
                paddingBottom: "5%",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <input
                type="text"
                style={{
                  width: "90%",
                  backgroundColor: "#f0eded",
                  boxShadow: "2px 2px 2px #888888",
                }}
                value={selectedQuestion.question}
                onChange={(e) =>
                  handleQuestionChange(e, selectedQuestion.index)
                }
                placeholder="Add your question here"
                className="question-input my-4 p-2 border rounded text-center"
              />
              <div
                style={{
                  backgroundColor: questions[selectedQuestion.index].imageSrc
                    ? "transparent"
                    : "#f0eded",
                }}
                className="insertImage border rounded m-2 text-center"
                onClick={() => fileInputRef.current.click()}
              >
                {questions[selectedQuestion.index].showText && (
                  <div style={{ color: "#6949FF" }}>
                    <InsertPhotoIcon />
                    <div>Add Cover Image</div>
                  </div>
                )}
                {questions[selectedQuestion.index].imageSrc && (
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                    src={questions[selectedQuestion.index].imageSrc}
                    alt="Selected Image"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(e) => handleImageChange(e)}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <div className="answers">
                <textarea
                  style={{
                    backgroundColor: "#3779FF",
                    border: "2px solid #3779FF",
                  }}
                  maxLength="200"
                  type="text"
                  placeholder="Add answer 1"
                  className="textarea my-4 p-3 m-2 text-white"
                  onChange={(e) =>
                    handleAnswerChange(e, selectedQuestion.index, 0)
                  }
                  value={questions[selectedQuestion.index].answers[0].text}
                />
                <Checkbox
                  style={{ color: "#6949FF" }}
                  disabled={
                    questions[selectedQuestion.index].answers[0].disabled
                  }
                  onChange={() =>
                    handleCheckboxChange(selectedQuestion.index, 0)
                  }
                  checked={
                    questions[selectedQuestion.index].answers[0].isCorrect
                  }
                />
                <textarea
                  style={{
                    backgroundColor: "#F75555",
                    border: "2px solid #F75555",
                  }}
                  maxLength="200"
                  type="text"
                  placeholder="Add answer 2"
                  className="textarea my-4 p-3 m-2 text-center text-white"
                  onChange={(e) =>
                    handleAnswerChange(e, selectedQuestion.index, 1)
                  }
                  value={questions[selectedQuestion.index].answers[1].text}
                />
                <Checkbox
                  style={{ color: "#6949FF" }}
                  disabled={
                    questions[selectedQuestion.index].answers[1].disabled
                  }
                  onChange={() =>
                    handleCheckboxChange(selectedQuestion.index, 1)
                  }
                  checked={
                    questions[selectedQuestion.index].answers[1].isCorrect
                  }
                />
              </div>
              {questions[selectedQuestion.index].answers.length > 2 ? (
                <div className="answers">
                  <textarea
                    style={{
                      backgroundColor: "#FF981F",
                      border: "2px solid #FF981F",
                    }}
                    maxLength="200"
                    type="text"
                    placeholder="Add answer 3"
                    className="textarea my-4 p-3 m-2 text-center text-white"
                    onChange={(e) =>
                      handleAnswerChange(e, selectedQuestion.index, 2)
                    }
                    value={questions[selectedQuestion.index].answers[2].text}
                  />
                  <Checkbox
                    style={{ color: "#6949FF" }}
                    disabled={
                      questions[selectedQuestion.index].answers[2].disabled
                    }
                    onChange={() =>
                      handleCheckboxChange(selectedQuestion.index, 2)
                    }
                    checked={
                      questions[selectedQuestion.index].answers[2].isCorrect
                    }
                  />
                  <textarea
                    style={{
                      backgroundColor: "#12D18E",
                      border: "2px solid #12D18E",
                    }}
                    maxLength="200"
                    type="text"
                    placeholder="Add answer 4"
                    className="textarea my-4 p-3 m-2 text-center text-white"
                    onChange={(e) =>
                      handleAnswerChange(e, selectedQuestion.index, 3)
                    }
                    value={questions[selectedQuestion.index].answers[3].text}
                  />
                  <Checkbox
                    style={{ color: "#6949FF" }}
                    disabled={
                      questions[selectedQuestion.index].answers[3].disabled
                    }
                    onChange={() =>
                      handleCheckboxChange(selectedQuestion.index, 3)
                    }
                    checked={
                      questions[selectedQuestion.index].answers[3].isCorrect
                    }
                  />
                </div>
              ) : (
                ""
              )}
              {questions[selectedQuestion.index].answers.length > 2 ? (
                <button
                  className="add-remove-answers text-white p-3"
                  onClick={removeLastTwoAnswers}
                >
                  Remove Answers
                </button>
              ) : (
                <button
                  className="add-remove-answers text-white p-3"
                  onClick={addLastTwoAnswers}
                >
                  Add Answers
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizCreation;
