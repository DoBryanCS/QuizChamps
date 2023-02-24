import React, { useState, useContext } from "react";
//import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { UnContexte } from "./App";

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
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConformPassword] = useState("");

  //navigation + keeping info in session storage
  const navigate = useNavigate();
  const leContext = useContext(UnContexte);

  //https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified
  //https://github.com/WebDevSimplified/React-Firebase-Auth
  async function Login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        console.log(user);
        leContext.setUID(user.uid);
      }).then (() => { navigate("/")})
      .catch((error) => {
        console.log(error);
      });
  }

  async function SignUp() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        leContext.setUID(user.uid);
        //navigate("/");
      }).then (() => { navigate("/")})
      .catch((error) => {
        console.log(error);
        // ..
      });
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    //const auth = getAuth();
    //const auth = getAuth(app);
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    /**const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    provider.setCustomParameters({
      prompt: "select_account",
      client_id: clientId,
    });*/
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // Do something with the signed-in user
        // Navigate to the home page
        //sessionStorage.setItem('UID', result.uid);
        leContext.setUID(result.uid);
        leContext.setName(result.displayName);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {showModal && (
          <div className="align-center h-64 w-64 flex items-center justify-center static">
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
                {Email !== "" && Password !== "" && (
                  <button
                    className="bg-indigo-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                    onClick={Login}
                  >
                    Login
                  </button>
                )}
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full ml-2"
                  onClick={handleToggleModal}
                >
                  Sign up
                </button>
              </form>
              <button
                className="bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={signInWithGoogle}
              >
                Login with Google
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {!showModal && (
          <div className="align-center h-64 w-64 flex items-center justify-center static">
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
                    onChange={(e) => setConformPassword(e.target.value)}
                  />
                </div>
                {Email !== "" &&
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
                  className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full ml-2"
                  onClick={handleToggleModal}
                >
                  Login
                </button>
              </form>
              <button
                className="bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={signInWithGoogle}
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
