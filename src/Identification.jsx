import React, { useState } from "react";
/**
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDZ_yT90A1M4pe66uGRoMGeUvxeIuKdGqo",
  authDomain: "quizchamp-c9a1c.firebaseapp.com",
  databaseURL: "https://quizchamp-c9a1c-default-rtdb.firebaseio.com",
  projectId: "quizchamp-c9a1c",
  storageBucket: "quizchamp-c9a1c.appspot.com",
  messagingSenderId: "201894449283",
  appId: "1:201894449283:web:09093af315b438b11acbb6",
  measurementId: "G-35M5JQ1HVL"
});

const auth = firebase.auth();
//stockage
//const firestore = firebase.firestore();

// Function login with google
const handleGoogleSignIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    setUser(result.user);
  } catch (error) {
    console.log(error);
  }
}; */

// Function logout with google
/**const handleSignOut = async () => {
  try {
    auth.signOut()
  } catch (error) {
    console.log(error);
  }
};*/

const Identification = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  //const [user, setUser] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  return (
    <div className="py-72 px-28">
      <div>
        {showModal && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-indigo-900">
            <div className="bg-white p-6 rounded-lg">
              <form className="pb-2">
                <h2 className="text-lg font-medium mb-4">Login</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    type="email"
                    value={Email}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    type="password"
                    value={Password}
                    required
                  />
                </div>
                <button
                  className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full ml-2"
                  onClick={handleToggleModal}
                >
                  Sign up
                </button>
              </form>
              <button
                className="bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                /**onClick={handleGoogleSignIn}*/
              >
                Login with Google
              </button>
            </div>
          </div>
        )}{" "}
      </div>
      <div>
        {!showModal && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-indigo-900">
            <div className="bg-white p-6 rounded-lg">
              <form className="pb-2">
                <h2 className="text-lg font-medium mb-4">Sign Up</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    type="email"
                    value={Email}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    type="password"
                    value={Password}
                    required
                  />
                </div>
                <button
                  className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                  type="submit"
                >
                  Sign Up
                </button>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full ml-2"
                onClick={handleToggleModal}
              >
                Login
              </button>
              </form>
              <button
                className="bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                /**onClick={handleGoogleSignIn}*/
              >
                Sign in with Google
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Identification;
