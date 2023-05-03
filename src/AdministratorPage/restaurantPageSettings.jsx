import React, { useState } from 'react';
import axios from 'axios';

function RestaurantSettingsForm() {
  const [capacity, setCapacity] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données de paramètres au serveur
    const restaurantData = {
      capacity: capacity,
    };
    axios.post('http://localhost:3001/settings', restaurantData)
      .then(response => {
        console.log(response.data);
        // Ajouter une logique pour gérer la réponse ici
      })
      .catch(error => {
        console.error(error);
        // Ajouter une logique pour gérer les erreurs ici
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Capacité maximale de convives :
        <input type="number" min={'0'} value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </label>
      <br />
      <button type="submit">Enregistrer</button>
      <button type="reset">Annuler</button>
    </form>
  );
}

export default RestaurantSettingsForm;
