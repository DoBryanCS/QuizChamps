import image from "./quizchamp-high-resolution-logo-color-on-transparent-background.png";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="section has-text-centered is-large">
        <img src={image} alt="Image" className="h-80 w-80" />
      </div>
    </div>
  );
}

export default Home;
