import { Link, Outlet } from 'react-router-dom';

function Accueil() {
    return (
      <div >
        <h1>Groupomania</h1>
        <nav>
        <Link to="/signup">S'inscrire</Link>
        <Link to="/login">Se connecter</Link>
      </nav>
      <Outlet/>
      </div>
    );
  }
  
  export default Accueil;