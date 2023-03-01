import React, { useRef, useState, useEffect } from "react";
import "./QuizCreationModal.css";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function QuizCreationModal({ show, setShow, quizInfo, setQuizInfo }) {
  // Use useRef to reference the input element for selecting an image file
  const fileInputRef = useRef(null);

  // Define state to keep track of whether the quiz form is valid and whether the cancel button is valid
  const [isQuizFormValid, setIsQuizFormValid] = useState(false);
  const [isCancelValid, setIsCancelValid] = useState(false);

  // Define state to keep track of the progress of image uploads
  const [perc, setPerc] = useState(null);

  // Define state to hold the temporary quiz information as the user edits the form
  const [quizInfoTemp, setQuizInfoTemp] = useState({
    title: "",
    topic: "",
    img: "",
    image: "",
    imageSrc: null,
    showText: true,
  });

  // Use useEffect to check whether the quiz form is valid and whether the cancel button is valid
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

  // Handle changes to the quiz title
  const handleTitleChange = (e) => {
    const newQuizInfoTemp = { ...quizInfoTemp };
    newQuizInfoTemp.title = e.target.value;
    setQuizInfoTemp(newQuizInfoTemp);
  };

  // Handle changes to the quiz topic
  const handleTopicChange = (e) => {
    const newQuizInfoTemp = { ...quizInfoTemp };
    newQuizInfoTemp.topic = e.target.value;
    setQuizInfoTemp(newQuizInfoTemp);
  };

  // Handle changes to the image file
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
    // set the state of quizInfo to quizInfoTemp
    setQuizInfo(quizInfoTemp);
    // hide the modal
    setShow(false);
  };

  const cancelSummary = () => {
    // set the state of quizInfoTemp to quizInfo
    setQuizInfoTemp(quizInfo);
    // hide the modal
    setShow(false);
  };

  return (
    show && (
      <>
        {/* A div with a semi-transparent black background covering the whole screen */}
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
        {/* A div containing the modal */}
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
          {/* The title of the modal */}
          <div
            className="text-2xl font-bold bg-gray-200 mb-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Quiz Summary
          </div>
          {/* A form for the quiz summary */}
          <form>
            {/* The input field for the quiz title */}
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
            {/* The input field for the quiz topic */}
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
            {/* The input field for the quiz cover image */}
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
              {/* A div for the image upload */}
              <div
                style={{
                  backgroundColor: quizInfoTemp.imageSrc
                    ? "transparent"
                    : "#f0eded",
                }}
                className="insertImage2 border rounded m-2 text-center"
                onClick={() => fileInputRef.current.click()} // when clicked, open file dialog
              >
                {quizInfoTemp.showText && (
                  <div style={{ color: "#6949FF", fontWeight: "bold" }}>
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
                    src={quizInfoTemp.imageSrc} // show selected image
                    alt="Selected Image"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                ref={fileInputRef} // reference to file input element
                onChange={(e) => handleImageChange(e)} // call function to handle selected image
                style={{ display: "none" }}
              />
            </div>
          </form>
          <div
            className="bg-gray-200"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              disabled={!isCancelValid || (perc !== null && perc < 100)} // disable if cancel is not valid or progress is not complete
              className="modalButton1 text-black p-3 font-bold"
              onClick={cancelSummary}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </button>
            <button
              disabled={!isQuizFormValid || (perc !== null && perc < 100)} // disable if form is not valid or progress is not complete
              className="modalButton2 text-white p-3 font-bold"
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
