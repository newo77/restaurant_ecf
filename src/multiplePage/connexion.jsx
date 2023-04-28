import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Connexion = (props) => {
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');
  const [redirectToInscription, setRedirectToInscription] = useState(false);
   const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/users/connexion', { email, mot_de_passe })
      .then((response) => {
        console.log(response.data);
        
        // setPrenom(response.data.prenom); // Stockage des informations de l'utilisateur dans l'état
        props.setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion à l\'API :', error);
        setRedirectToInscription(true);
      });
  };

  const handleGoToInscription = () => {
    setRedirectToInscription(true);
  };

  if (redirectToInscription) {
    return navigate('/inscription');
  }

  if (props.isLoggedIn) {
    return navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <div>
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <label htmlFor="motDePasse">Mot de passe :</label>
        <input type="password" id="motDePasse" required value={mot_de_passe} onChange={(event) => setMotDePasse(event.target.value)} />
      </div>
      <button type="submit">Se connecter</button>
      <button type="button" onClick={handleGoToInscription}>S'inscrire</button>
    </form>
  );
};

export default Connexion;
