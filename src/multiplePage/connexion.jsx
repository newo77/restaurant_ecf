<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
>>>>>>> ad11969f6644289ae95c0e758afc7816fae140f5

const Connexion = (props) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToInscription, setRedirectToInscription] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate();
=======
   const navigate = useNavigate();

>>>>>>> ad11969f6644289ae95c0e758afc7816fae140f5

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/users/connexion", { email, mot_de_passe })
      .then((response) => {
        // Stockage de la variable d'authentification et du nom d'utilisateur dans localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("role",response.data.role)

        setIsLoggedIn(true);
        props.setIsLoggedIn(true);
        return navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion à l'API :", error);
        setRedirectToInscription(true);
      });
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role")
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      props.setIsLoggedIn(true);
      setEmail(storedEmail);
      setRole(storedRole)
    }
    if (storedId) {
      setUserId(storedId);
    }
  }, [props]);

  const handleGoToInscription = () => {
    setRedirectToInscription(true);
  };

  if (redirectToInscription) {
<<<<<<< HEAD
    return navigate("/inscription");
=======
    return navigate('/inscription');
  }

  if (props.isLoggedIn) {
    return navigate('/');
>>>>>>> ad11969f6644289ae95c0e758afc7816fae140f5
  }

  return (
    <>
      {isLoggedIn ? (
        <p>Bonjour {role} ! Vous êtes connecté.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="motDePasse">Mot de passe :</label>
            <input
              type="password"
              id="motDePasse"
              required
              value={mot_de_passe}
              onChange={(event) => setMotDePasse(event.target.value)}
            />
          </div>
          <button type="submit">Se connecter</button>
          <button type="button" onClick={handleGoToInscription}>
            S'inscrire
          </button>
        </form>
      )}
    </>
  );
};

export default Connexion;
