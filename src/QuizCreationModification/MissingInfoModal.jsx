import React from "react";

export default function MissingInfoModal(props) {
  // Destructure the required props from the props object
  const { missingInfoModalOpen, setMissingInfoModalOpen, missingQuestions } =
    props;

  return (
    missingInfoModalOpen && (
      <>
        {/* A div with a semi-transparent black background covering the whole screen */}
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10" />
        {/* A div containing the modal */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-20 w-96 max-h-80">
          {/* A header section with a gray background, containing the title */}
          <div className="bg-gray-200 rounded-t-lg px-4 py-3">
            <h2 className="font-bold text-2xl">Missing Information</h2>
          </div>
          {/* A scrollable section displaying each question with its missing information */}
          <div className="px-4 py-2 max-h-64 overflow-y-auto">
            <ul>
              {missingQuestions.map((question) => (
                <li key={question.number}>
                  {/* The question number */}
                  <h3 className="font-bold text-lg p-3">{`Question ${question.number}:`}</h3>
                  <ul className="list-disc pl-5">
                    {/* Display each missing information */}
                    {question.info.map((info) => (
                      <li key={info}>{info}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          {/* A footer section with a gray background, containing the Ok button */}
          <div className="bg-gray-200 rounded-b-lg px-4 py-3">
            <button
              style={{
                backgroundColor: "#6949FF",
                border: "2px solid #6949FF",
                borderRadius: "15px",
                boxShadow: "10px 10px 10px #888888",
                marginRight: "10px",
              }}
              className="py-2 px-4 text-white rounded font-bold"
              onClick={() => setMissingInfoModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </div>
      </>
    )
  );
}
