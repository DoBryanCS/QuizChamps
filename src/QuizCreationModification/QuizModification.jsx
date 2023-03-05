import { useState, useRef, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Checkbox from "@mui/material/Checkbox";
import QuizModificationModal from "./QuizModificationModal";
import MissingInfoModal from "./MissingInfoModal";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./QuizCreation.css";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { UnContexte } from "../App";

function QuizModification() {
  const serveur = "http://localhost:3000/quizs/";
  const [showPopup, setShowPopup] = useState(true); // initialize state for the modal popup
  const [missingInfoModalOpen, setMissingInfoModalOpen] = useState(false);
  const [missingQuestions, setMissingQuestions] = useState([]);
  const leContext = useContext(UnContexte);
  const navigate = useNavigate();

  const { id } = useParams();

  // create a reference to the file input element
  const fileInputRef = useRef(null);

  // initialize state for quiz info
  const [quizInfo, setQuizInfo] = useState({
    title: "",
    topic: "",
    img: "",
    imageSrc: "",
    showText: "true",
  });

  // initialize state for questions
  const [questions, setQuestions] = useState([
    {
      question: "",
      img: "",
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

  // initialize state for selected question
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    index: 0,
  });

  // get quiz data
  async function getQuiz(id) {
    let rep = await fetch(`${serveur}/${id}`);
    if (rep.ok) {
      let data = await rep.json();
      return data;
    } else {
      console.log("Erreur getQuiz");
    }
  }

  // prepopulated states and fields with quiz data
  useEffect(() => {
    async function getData() {
      const quizData = await getQuiz(id);
      setQuizInfo({
        title: quizData.quizTitle,
        topic: quizData.topic,
        img: quizData.img,
        imageSrc: quizData.img,
        showText: !quizData.img,
      });
      setQuestions(
        Object.values(quizData["Questions"]).map((q) => ({
          question: q.Question,
          img: q.imgURL,
          imageSrc: q.imgURL,
          showText: !q.imgURL,
          answers: Object.entries(q.Answers).map(([text, isCorrect]) => ({
            text,
            isCorrect,
            disabled: !isCorrect,
          })),
        }))
      );
    }
    getData().then(() => console.log("done getData"));
  }, [id]);

  // function to add a new question
  const addQuestion = (event) => {
    event.preventDefault();
    setQuestions(
      questions.concat({
        question: "",
        img: "",
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

  // function to handle changes in a question
  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
    setSelectedQuestion({ question: e.target.value, index });
  };

  // function to select a question
  const selectQuestion = (question, index) => {
    setSelectedQuestion({ question, index });
  };

  // function to handle changes in an answer
  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].text = e.target.value;
    setQuestions(updatedQuestions);
  };

  // function to handle checkbox changes for correct answers
  const handleCheckboxChange = (questionIndex, answerIndex) => {
    // make a copy of the questions array to avoid mutating the state directly
    const updatedQuestions = [...questions];

    // update the isCorrect property of the selected answer
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect =
      !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;

    // if the selected answer is marked as correct
    if (
      updatedQuestions[questionIndex].answers[answerIndex].isCorrect === true
    ) {
      // disable all the other answer options
      for (let i = 0; i < updatedQuestions[questionIndex].answers.length; i++) {
        if (i !== answerIndex) {
          updatedQuestions[questionIndex].answers[i].disabled = true;
        }
      }
    } else {
      // if the selected answer is not marked as correct
      // enable all the other answer options
      for (let i = 0; i < updatedQuestions[questionIndex].answers.length; i++) {
        updatedQuestions[questionIndex].answers[i].disabled = false;
      }
    }
    // update the state with the modified questions array
    setQuestions(updatedQuestions);
  };

  // function to handle image changes
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      // make a copy of the questions array to avoid mutating the state directly
      const newQuestions = [...questions];
      const imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      // update the image source and hide the text if an image is selected
      newQuestions[selectedQuestion.index].imageSrc = objectUrl;
      newQuestions[selectedQuestion.index].showText = false;

      // Upload the image to Firebase Storage
      const storageRef = ref(storage, imageFile.name);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            newQuestions[selectedQuestion.index].img = downloadURL;
            setQuestions(newQuestions);
          });
        }
      );
    } else {
      // if no image is selected
      // make a copy of the questions array to avoid mutating the state directly
      const newQuestions = [...questions];
      // reset the image properties and show the text
      newQuestions[selectedQuestion.index].img = "";
      newQuestions[selectedQuestion.index].imageSrc = null;
      newQuestions[selectedQuestion.index].showText = true;
      setQuestions(newQuestions);
    }
  };

  // This function removes the last two answers from the selected question in the state object and updates it.
  const removeLastTwoAnswers = (event) => {
    event.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestion.index].answers.pop();
    updatedQuestions[selectedQuestion.index].answers.pop();
    for (
      let i = 0;
      i < updatedQuestions[selectedQuestion.index].answers.length;
      i++
    ) {
      updatedQuestions[selectedQuestion.index].answers[i].disabled = false;
      updatedQuestions[selectedQuestion.index].answers[i].isCorrect = false;
    }
    setQuestions(updatedQuestions);
  };

  // This function adds two new answer objects to the selected question in the state object and updates it.
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
    for (
      let i = 0;
      i < updatedQuestions[selectedQuestion.index].answers.length;
      i++
    ) {
      updatedQuestions[selectedQuestion.index].answers[i].disabled = false;
      updatedQuestions[selectedQuestion.index].answers[i].isCorrect = false;
    }
    setQuestions(updatedQuestions);
  };

  // This function generates a quiz object from the questions, image URL, title, and topic provided.
  function generateQuizObject(questions, img, title, topic) {
    const quiz = {};
    questions.forEach((question, index) => {
      const answers = {};
      question.answers.forEach((answer) => {
        answers[answer.text] = answer.isCorrect;
      });
      quiz[`Question ${index + 1}`] = {
        Answers: answers,
        Question: question.question,
        imgURL: question.img,
      };
    });

    return {
      Questions: quiz,
      creator: leContext.Name,
      img: img,
      quizTitle: title,
      topic: topic,
      userID: leContext.UID,
    };
  }

  function validateQuestions() {
    let missingQuestions = [];

    // Check if there are no questions
    if (questions.length === 0) {
      missingQuestions.push({
        number: 1,
        info: ["Please add at least one question"],
      });
      return missingQuestions;
    }

    // Check each question for missing information
    for (let i = 0; i < questions.length; i++) {
      let question = questions[i];
      let missingInfo = [];

      // Check if there are no questions
      if (questions.length === 0) {
        missingQuestions.push({
          number: 1,
          info: ["Please add at least one question"],
        });
        return missingQuestions;
      }

      // Check question text
      if (!question.question) {
        missingInfo.push("Question missing");
      }

      // Check answer text
      let answersMissing = question.answers.filter(
        (answer) => !answer.text
      ).length;
      if (answersMissing > 0) {
        missingInfo.push(`${answersMissing} answer(s) missing`);
      }

      // Check for duplicate answer text
      let answerTexts = question.answers.map((answer) => answer.text);
      let uniqueAnswerTexts = [...new Set(answerTexts)];
      if (answerTexts.length !== uniqueAnswerTexts.length) {
        missingInfo.push("Can't have same answers");
      }

      // Check each answer
      for (let j = 0; j < question.answers.length; j++) {
        let answer = question.answers[j];

        // Check if answer is correct
        if (answer.isCorrect) {
          break;
        }

        // If all answers have been checked and none are correct, add missing information
        if (j === question.answers.length - 1) {
          missingInfo.push("Correct answer not selected ");
        }
      }

      // Add question and missing information to list if there is missing information
      if (missingInfo.length > 0) {
        missingQuestions.push({
          number: i + 1,
          info: missingInfo,
        });
      }
    }

    // If there are no missing questions, return true
    if (missingQuestions.length === 0) {
      return null;
    } else {
      return missingQuestions;
    }
  }

  const handlesaveQuestions = () => {
    navigate("/Dashboard");
  };

  // This function formats and sends the quiz data to a server for saving.
  const saveQuestions = () => {
    const validationErrors = validateQuestions();
    if (validationErrors) {
      setMissingInfoModalOpen(true);
      setMissingQuestions(validationErrors);
    } else {
      const formattedData = generateQuizObject(
        questions,
        quizInfo.img,
        quizInfo.title,
        quizInfo.topic
      );
      fetch(`${serveur}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          handlesaveQuestions();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <div>
        <QuizModificationModal
          quizInfo={quizInfo}
          setQuizInfo={setQuizInfo}
          show={showPopup}
          setShow={setShowPopup}
        ></QuizModificationModal>
      </div>
      <div>
        <MissingInfoModal
          missingInfoModalOpen={missingInfoModalOpen}
          setMissingInfoModalOpen={setMissingInfoModalOpen}
          missingQuestions={missingQuestions}
        ></MissingInfoModal>
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
                <AddCircleIcon
                  onClick={addQuestion}
                  style={{ color: "#6949FF" }}
                ></AddCircleIcon>
                <SettingsIcon
                  style={{ color: "#6949FF" }}
                  onClick={() => setShowPopup(true)}
                >
                  Settings
                </SettingsIcon>
                <SaveIcon
                  onClick={saveQuestions}
                  style={{ color: "#6949FF" }}
                ></SaveIcon>
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
                value={questions[selectedQuestion.index].question}
                onChange={(e) =>
                  handleQuestionChange(e, selectedQuestion.index)
                }
                placeholder="Add your question here"
                className="question-input my-4 p-2 border rounded text-center"
              />
              <div
                style={{
                  backgroundColor: questions[selectedQuestion.index].imageSrc
                    ? "#f0eded"
                    : "#f0eded",
                  border: "2px solid #6949FF",
                }}
                className="insertImage border rounded m-2 text-center"
                onClick={() => fileInputRef.current.click()}
              >
                {questions[selectedQuestion.index].showText && (
                  <div style={{ color: "#6949FF", fontWeight: "bold" }}>
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
                  maxLength="200"
                  type="text"
                  placeholder="Add answer 1"
                  className="textarea my-4 p-3 m-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  onChange={(e) =>
                    handleAnswerChange(e, selectedQuestion.index, 0)
                  }
                  value={questions[selectedQuestion.index].answers[0].text}
                />
                <Checkbox
                  className="checkbox"
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
                  maxLength="200"
                  type="text"
                  placeholder="Add answer 2"
                  className="textarea my-4 p-3 m-2 text-center text-white bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500"
                  onChange={(e) =>
                    handleAnswerChange(e, selectedQuestion.index, 1)
                  }
                  value={questions[selectedQuestion.index].answers[1].text}
                />
                <Checkbox
                  className="checkbox"
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
                    maxLength="200"
                    type="text"
                    placeholder="Add answer 3"
                    className="textarea my-4 p-3 m-2 text-center text-white bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                    onChange={(e) =>
                      handleAnswerChange(e, selectedQuestion.index, 2)
                    }
                    value={questions[selectedQuestion.index].answers[2].text}
                  />
                  <Checkbox
                    className="checkbox"
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
                    maxLength="200"
                    type="text"
                    placeholder="Add answer 4"
                    className="textarea my-4 p-3 m-2 text-center text-white bg-gradient-to-r from-violet-500 via-blue-500 to-teal-500"
                    onChange={(e) =>
                      handleAnswerChange(e, selectedQuestion.index, 3)
                    }
                    value={questions[selectedQuestion.index].answers[3].text}
                  />
                  <Checkbox
                    className="checkbox"
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
                  className="add-remove-answers text-white p-3 font-bold"
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

export default QuizModification;
