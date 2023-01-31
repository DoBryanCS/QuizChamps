import React, { useRef } from "react";
import "./QuizCreationModal.css";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

function QuizCreationModal({ show, setShow }) {
  const fileInputRef = useRef(null);
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
            top: "10%",
            left: "20%",
            right: "20%",
            bottom: "10%",
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
              <label className="font-bold">Cover Image:</label>
              <div
                className="insertImage2 border rounded m-2 text-center"
                onClick={() => fileInputRef.current.click()}
              >
                <div>Add Cover Image</div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                ref={fileInputRef}
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
              className="modalButton1 text-black p-3"
              onClick={() => setShow(false)}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </button>
            <button
              className="modalButton2 text-white p-3"
              onClick={() => setShow(false)}
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
