import React, { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/users", {
        nom,
        prenom,
        email,
        mot_de_passe: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
      </label>
      <label>
        prénom:
        <input
          type="text"
          value={prenom}
          onChange={(e) => setprenom(e.target.value)}
        />
      </label>
      <br />
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
        mot de passe:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
