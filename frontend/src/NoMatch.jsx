import { Link } from "react-router-dom";
import image from "./quizchamp-high-resolution-logo-color-on-transparent-background.png";

function NoMatch() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="section has-text-centered">
        <h1 className="text-center text-4xl font-extrabold">You're not authenticated</h1>
      </div>
      <Link to="/" className="mt-8 text-center">
        <strong> Click here to go back to Home page</strong>
        <img src={image} alt="Image" className="h-60 w-60 m-4" />
      </Link>
    </div>
  );
}

export default NoMatch;