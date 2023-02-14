import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
    <div className="section has-text-centered is-large">
        <h1>NoMatch</h1>
    </div>
    <Link to="/" className='has-text-centered'><strong>Retour à l'accueil</strong></Link>
    </div>
  );
}

export default NoMatch;
