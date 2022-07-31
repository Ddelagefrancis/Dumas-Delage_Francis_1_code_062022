import { Link, Outlet } from 'react-router-dom';

function Accueil() {
  return (
    <div className='accueil'>
      <div className="accueil-container">
        <img src="./img/icon-left-font.png" alt="img-acceuil" className="accueil_img" />
        <p>Réseau social interne pour les employés</p>
        <img src="./img/social_img.png" alt="img-social" className="accueil-social_img " />
      </div >
      <nav>
        <Link to="/signup" className="nav">S'inscrire</Link>
        <Link to="/login" className="nav">Se connecter</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Accueil;