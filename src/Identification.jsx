import React, { useState, useContext, useEffect } from "react";
import {
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { UnContexte } from "./App";

const Identification = () => {
  //const auth = getAuth();
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("test erreur");

  useEffect(() => {
    setError("");
  }, [Username, Email, Password, ConfirmPassword, showModal]);

  //navigation + keeping info in session storage
  const navigate = useNavigate();
  const leContext = useContext(UnContexte);

  //https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified
  //https://github.com/WebDevSimplified/React-Firebase-Auth
  //async function Login() {
  const Login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        leContext.setUID(user.uid);
        leContext.setName(user.displayName);
        leContext.setIdentifyModal(false);
        navigate("/Dashboard");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  //async function SignUp() {
  const SignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: Username,
        });
        console.log(userCredential.user);
        const user = userCredential.user;
        leContext.setUID(user.uid);
        leContext.setName(Username);
        sessionStorage.setItem("UID", user.uid);
        leContext.setIdentifyModal(false);
        navigate("/Dashboard");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
        // ..
      });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        leContext.setUID(user.uid);
        sessionStorage.setItem("UID", user.uid);
        leContext.setName(user.displayName);
        leContext.setIdentifyModal(false);
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-blur-sm z-10">
      <div className="bg-white p-6 rounded-lg">
        {showModal && (
          <form className="pb-2">
            <h2 className="font-bold text-xl mb-4">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="email"
                value={Email}
                required
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {Error && <div className="text-red-500">"{Error}"</div>}
            <button
              className="font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-full ml-2"
              onClick={handleToggleModal}
            >
              Sign up
            </button>
            {Email !== "" && Password !== "" && (
              <button
                className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                onClick={Login}
              >
                Login
              </button>
            )}

            <button
              className="bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0 "
              onClick={() => leContext.setIdentifyModal(false)}
            >
              Close
            </button>
          </form>
        )}

        {!showModal && (
          <form className="pb-2">
            <h2 className="font-bold text-xl mb-4">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="text"
                value={Username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="email"
                value={Email}
                required
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="password"
                value={ConfirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {Error && <div className="text-red-500">"{Error}"</div>}
            <button
              className="font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-full ml-2"
              onClick={handleToggleModal}
            >
              Login
            </button>
            {Username !== "" &&
              Email !== "" &&
              Password !== "" &&
              Password == ConfirmPassword && (
                <button
                  className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                  onClick={SignUp}
                >
                  Sign Up
                </button>
              )}

            <button
              className="bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full top-0 left-0 "
              onClick={() => leContext.setIdentifyModal(false)}
            >
              Close
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export { Identification };
