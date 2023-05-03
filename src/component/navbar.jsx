import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar(props) {
  const isLoggedIn = props.isLoggedIn;
  
  // const prenom = props.prenom; // récupérer le prénom de l'utilisateur connecté
  const handleLogout = props.handleLogout;

  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/reservation">Réservation</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={handleLogout}>Déconnexion</Link>
          </li>
        ) : (
          <li>
            <Link to="/connexion">Connexion</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
