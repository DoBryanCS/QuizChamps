import React, { useRef, useState, useEffect } from "react";
import "./QuizCreationModal.css";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function QuizCreationModal({ show, setShow, quizInfo, setQuizInfo }) {
  const fileInputRef = useRef(null);
  const [isQuizFormValid, setIsQuizFormValid] = useState(false);
  const [isCancelValid, setIsCancelValid] = useState(false);
  const [perc, setPerc] = useState(null);
  const [quizInfoTemp, setQuizInfoTemp] = useState({
    title: "",
    topic: "",
    img: "",
    image: "",
    imageSrc: null,
    showText: true,
  });

  useEffect(() => {
    if (
      quizInfo.title !== "" &&
      quizInfo.topic !== "" &&
      quizInfo.showText == false
    ) {
      setIsCancelValid(true);
    } else {
      setIsCancelValid(false);
    }
    if (
      quizInfoTemp.title !== "" &&
      quizInfoTemp.topic !== "" &&
      quizInfoTemp.showText == false
    ) {
      setIsQuizFormValid(true);
    } else {
      setIsQuizFormValid(false);
    }
  }, [quizInfo, quizInfoTemp.title, quizInfoTemp.topic, quizInfoTemp.showText]);

  const handleTitleChange = (e) => {
    const newQuizInfoTemp = { ...quizInfoTemp };
    newQuizInfoTemp.title = e.target.value;
    setQuizInfoTemp(newQuizInfoTemp);
  };

  const handleTopicChange = (e) => {
    const newQuizInfoTemp = { ...quizInfoTemp };
    newQuizInfoTemp.topic = e.target.value;
    setQuizInfoTemp(newQuizInfoTemp);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const newQuizInfoTemp = { ...quizInfoTemp };
      const imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      newQuizInfoTemp.imageSrc = objectUrl;
      newQuizInfoTemp.showText = false;
      newQuizInfoTemp.image = imageFile;
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
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
            newQuizInfoTemp.img = downloadURL;
            setQuizInfoTemp(newQuizInfoTemp);
          });
        }
      );
    } else {
      const newQuizInfoTemp = { ...quizInfoTemp };
      newQuizInfoTemp.img = "";
      newQuizInfoTemp.image = "";
      newQuizInfoTemp.imageSrc = null;
      newQuizInfoTemp.showText = true;
      setQuizInfoTemp(newQuizInfoTemp);
    }
  };

  const saveSummary = () => {
    setQuizInfo(quizInfoTemp);
    setShow(false);
  };

  const cancelSummary = () => {
    setQuizInfoTemp(quizInfo);
    setShow(false);
  };

  return (
    show && (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: "1",
            pointerEvents: "none",
          }}
        />
        <div
          className="grid-container3"
          style={{
            borderRadius: "10px",
            position: "fixed",
            top: "8%",
            left: "20%",
            right: "20%",
            bottom: "8%",
            background: "white",
            boxShadow: "10px 10px 50px #888888",
            zIndex: "1",
            pointerEvents: "all",
          }}
        >
          <div
            className="text-2xl font-bold"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Quiz Summary
          </div>
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label className="font-bold">Title:</label>
              <input
                type="text"
                style={{
                  width: "90%",
                  backgroundColor: "#f0eded",
                  boxShadow: "2px 2px 2px #888888",
                }}
                placeholder="Quiz Title"
                className="question-input my-4 p-2 border rounded text-center"
                onChange={(e) => handleTitleChange(e)}
                value={quizInfoTemp.title}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <label className="font-bold">Topic:</label>
              <input
                type="text"
                style={{
                  width: "90%",
                  backgroundColor: "#f0eded",
                  boxShadow: "2px 2px 2px #888888",
                }}
                placeholder="Quiz Topic"
                className="question-input my-4 p-2 border rounded text-center"
                onChange={(e) => handleTopicChange(e)}
                value={quizInfoTemp.topic}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "40%",
              }}
            >
              <label style={{ paddingTop: "20px" }} className="font-bold">
                Cover Image:
              </label>
              <div
                style={{
                  backgroundColor: quizInfoTemp.imageSrc
                    ? "transparent"
                    : "#f0eded",
                }}
                className="insertImage2 border rounded m-2 text-center"
                onClick={() => fileInputRef.current.click()}
              >
                {quizInfoTemp.showText && (
                  <div style={{ color: "#6949FF" }}>
                    <InsertPhotoIcon />
                    <div>Add Cover Image</div>
                  </div>
                )}
                {quizInfoTemp.imageSrc && (
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                    src={quizInfoTemp.imageSrc}
                    alt="Selected Image"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e)}
                style={{ display: "none" }}
              />
            </div>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              disabled={!isCancelValid || (perc !== null && perc < 100)}
              className="modalButton1 text-black p-3"
              onClick={cancelSummary}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </button>
            <button
              disabled={!isQuizFormValid || (perc !== null && perc < 100)}
              className="modalButton2 text-white p-3"
              onClick={saveSummary}
            >
              Save
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default QuizCreationModal;
