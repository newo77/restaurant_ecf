import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [convives, setConvives] = useState("");
  const [allergies, setAllergies] = useState("");
  const [role, setRole] = useState("client");
  const [isAdminPresent, setIsAdminPresent] = useState(false); // variable d'état pour savoir si un admin est présent
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/admin")
      .then((response) => {
        setIsAdminPresent(response.data[0].count > 0);
        //renvoie un boolean si au moin un admin est présent en db
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/users", {
        email,
        mot_de_passe: password,
        convives,
        allergies,
        role,
      })
      .then((response) => {
        navigate("/connexion"); // Redirige vers la page de connexion
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
        Convives par défaut :
        <input
          type="number"
          value={convives}
          min={"0"}
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
      {/* Afficher dynamiquement le select en fonction de la présence d'un admin */}
      {isAdminPresent ? null : (
        <label>
          Rôle:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="admin">Administrateur</option>
          </select>
        </label>
      )}
      <button type="submit">Créer mon compte {role}</button>
    </form>
  );
}

export default RegistrationForm;
