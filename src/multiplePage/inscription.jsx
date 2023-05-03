import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [convives, setConvives] = useState("");
  const [allergies, setAllergies] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/users", {
        email,
        mot_de_passe: password,
        convives,
        allergies,
        role: "client"
      })
      .then((response) => {
        navigate('/connexion'); // Redirige vers la page de connexion
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Mot de passe:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        convives par défaut :
        <input
          type="number"
          value={convives}
          min={'0'}
          onChange={(e) => setConvives(e.target.value)}
        />
      </label>
      <br />
      <label>
        Allergies : 
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
      </label>
      <button type="submit">Créer mon compte client</button>
    </form>
  );
}

export default RegistrationForm;
