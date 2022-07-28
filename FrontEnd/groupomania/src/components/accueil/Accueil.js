import { Link, Outlet } from 'react-router-dom';

function Accueil() {
  return (
    <div >
      <div className="accueil-container">
        <img src="./img/icon-left-font.png" alt="img-acceuil" />
        <p>Réseau social interne pour les employés</p>
      </div >
      {/* <div className="accueil-social_img">
        <img src="./img/social_network.png" alt="img-acceuil" />
      </div > */}
      <nav>
        <Link to="/signup">S'inscrire</Link>
        <Link to="/login">Se connecter</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Accueil;