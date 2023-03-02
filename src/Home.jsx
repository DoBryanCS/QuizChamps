import image from "./quizchamp-high-resolution-logo-color-on-transparent-background.png";
import {useContext} from "react";
import {UnContexte} from "./App";

function Home() {
  const Context = useContext(UnContexte);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="section has-text-centered is-large" onClick={() => Context.setModal(true)} >
        <img src={image} alt="Image" className="h-80 w-80" />
      </div>
    </div>
  );
}

export default Home;
