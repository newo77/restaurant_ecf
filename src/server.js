// importer les modules nécessaires
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');


// initialiser l'application express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// créer une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "root",
  database: "restaurant",
});

// vérifier la connexion à la base de données MySQL
connection.connect((error) => {
  if (error) {
    console.error(
      "Erreur lors de la connexion à la base de données MySQL :",
      error
    );
  } else {
    console.log("Connexion à la base de données MySQL réussie");
  }
});

// définir la route User de l'API RESTful
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des données de la table des utilisateurs :",
        error
      );
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

// Je poste dans la table des Users

app.post("/users", async (req, res) => {
  const { email, mot_de_passe, convives, allergies } = req.body;
  const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // hacher le mot de passe avec un salt factor de 10
  const sql = `INSERT INTO users ( email, mot_de_passe, convives, allergies, role) VALUES ( '${email}', '${hashedPassword}', '${convives}', '${allergies}', 'client')`;

  connection.query(sql, (error, result) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion des données dans la table des utilisateurs :",
        error
      );
      res.sendStatus(500);
    } else {
      console.log(
        "Les données ont été insérées avec succès dans la table des utilisateurs"
      );
      res.sendStatus(201);
    }
  });
});


//Pour la connexion je définis une route

app.post("/users/connexion", async (req, res) => {
  const { email, mot_de_passe } = req.body;
  const sql = `SELECT * FROM users WHERE email = '${email}'`;

  connection.query(sql, async (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des données de la table des utilisateurs :",
        error
      );
      res.sendStatus(500);
    } else if (results.length === 0) {
      console.error(
        "Aucun utilisateur correspondant aux informations de connexion fournies"
      );
      res.sendStatus(401);
    } else {
      const user = results[0];
      const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe); // comparer le mot de passe haché stocké dans la base de données avec le mot de passe fourni par l'utilisateur
      if (match) {
        console.log("Connexion réussie");
        res.sendStatus(200);
      } else {
        console.error("Mot de passe incorrect");
        res.sendStatus(401);
      }
    }
  });
});


// ----------------------------------------------Requete pour les images --------------------------------------------------------

// Endpoint pour récupérer toutes les images
app.get("/images", (req, res) => {
  const sql = "SELECT * FROM images";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint pour récupérer une image spécifique
app.get("/images/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM images WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Endpoint pour ajouter une nouvelle image
app.post("/images", (req, res) => {
  const title = req.body.title;
  const image = req.body.image;

  console.log("title:", title);
  console.log("image:", image);

  const sql = "INSERT INTO images (title, image) VALUES (?, ?)";

  connection.query(sql, [title, image], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint pour mettre à jour une image existante
app.put("/images/:id", (req, res) => {
  const id = req.params.id;
  const image = req.body.image;
  const title = req.body.title;

  const sql = "UPDATE images SET title = ?, image = ? WHERE id = ?";
  connection.query(sql, [title, image, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint pour supprimer une image
app.delete("/images/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM images WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//---------------------------------Requêtes pour récupérer les heures d'ouvertures du restaurant ------------------------

// Endpoint pour récupérer les heures d'ouverture
app.get("/open_hours", (req, res) => {
  const sql = "SELECT * FROM open_hours";
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des données de la table des heures d'ouverture :",
        error
      );
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint pour récupérer les heures d'ouverture pour un jour donné
app.get("/open_hours/:date", (req, res) => {
  const { date } = req.params;
  const dayOfWeek = new Date(date).getDay();

  let sql = "";
  switch (dayOfWeek) {
    case 0: // dimanche
      sql = "SELECT * FROM open_hours WHERE day = 'Dimanche'";
      break;
    case 1: // lundi
      sql = "SELECT * FROM open_hours WHERE day = 'Lundi'";
      break;
    case 2: // mardi
      sql = "SELECT * FROM open_hours WHERE day = 'Mardi'";
      break;
    case 3: // mercredi
      sql = "SELECT * FROM open_hours WHERE day = 'Mercredi'";
      break;
    case 4: // jeudi
      sql = "SELECT * FROM open_hours WHERE day = 'Jeudi'";
      break;
    case 5: // vendredi
      sql = "SELECT * FROM open_hours WHERE day = 'Vendredi'";
      break;
    case 6: // samedi
      sql = "SELECT * FROM open_hours WHERE day = 'Samedi'";
      break;
    default:
      res.status(400).send("Date invalide");
      return;
  }

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des données de la table des heures d'ouverture :",
        error
      );
      res.sendStatus(500);
    } else {
      const open_hours = results[0];
      const start_time = new Date(`${date} ${open_hours.hours_open}`);
      const end_time = new Date(`${date} ${open_hours.hours_close}`);

      const time_slots = [];

      for (let time = start_time; time < end_time; time.setMinutes(time.getMinutes() + 15)) {
        const time_slot = time.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
        time_slots.push(time_slot);
      }

      res.status(200).json(time_slots);
    }
  });
});


// Endpoint pour vérifier les disponibilités pour une date et une heure donnée
app.get("/availability/:date/:time/:nb_guests", (req, res) => {
  const { date, time, nb_guests } = req.params;
  const sql = "SELECT SUM(nb_guests) AS total_guests FROM reservations WHERE date = ? AND time = ?";
  connection.query(sql, [date, time], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la vérification des disponibilités :",
        error
      );
      res.sendStatus(500);
    } else {
      const totalGuests = results[0].total_guests || 0;
      const maxGuests = 20; // Récupérer le seuil de convives maximum depuis le panel d'administration
      const available = maxGuests - totalGuests >= nb_guests;
      res.status(200).json({ available });
    }
  });
});




// Endpoint pour mettre à jour les heures d'ouverture
app.put("/open_hours", (req, res) => {
  const { id, hours_open, hours_close } = req.body;
  const sql = `UPDATE open_hours SET hours_open = '${hours_open}', hours_close = '${hours_close}' WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) {
      console.error(
        "Erreur lors de la mise à jour des données dans la table des heures d'ouverture :",
        error
      );
      res.sendStatus(500);
    } else {
      console.log(
        "Les données ont été mises à jour avec succès dans la table des heures d'ouverture"
      );
      res.sendStatus(200);
    }
  });
});

// Endpoint pour ajouter les heures d'ouverture
app.post("/open_hours", (req, res) => {
  const { day, hours_open, hours_close } = req.body;
  const sql = `INSERT INTO open_hours (day, hours_open, hours_close) VALUES ('${day}', '${hours_open}', '${hours_close}')`;

  connection.query(sql, (error, result) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion des données dans la table des heures d'ouverture :",
        error
      );
      res.sendStatus(500);
    } else {
      console.log(
        "Les données ont été insérées avec succès dans la table des heures d'ouverture"
      );
      res.sendStatus(201);
    }
  });
});

// Endpoint pour supprimer les heures d'ouverture
app.delete("/open_hours/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM open_hours WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(
        "Erreur lors de la suppression des données dans la table des heures d'ouverture :",
        error
      );
      res.sendStatus(500);
    } else {
      console.log(
        "Les données ont été supprimées avec succès dans la table des heures d'ouverture"
      );
      res.sendStatus(200);
    }
  });
});

//---------------------------------Requêtes pour récupérer les réservations pour le restaurant ------------------------

// Récupérer toutes les réservations
app.get('/reservations', (req, res) => {
  const sql = 'SELECT * FROM reservations';

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Récupère tout les clients et les additionne

app.get('/reservations/num_guests', (req, res) => {
  const sql = 'SELECT num_guests FROM reservations';
  console.log('sql =>',sql);

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const sum = results.reduce((acc, curr) => acc + curr.num_guests, 0);
      res.json({ total_num_guests: sum });
    }
  });
});

// Ajouter une nouvelle réservation
app.post('/reservation-register', (req, res) => {
  const { num_guests, reservation_date, reservation_time, allergies } = req.body;
  
  // // Vérifier que tous les champs obligatoires sont renseignés
  // if (!num_guests || !reservation_date || !reservation_time) {
  //   return res.status(400).json({ message: 'Tous les champs obligatoires doivent être renseignés.' });
  // }
  

  // Insérer la nouvelle réservation dans la base de données
  const sql = 'INSERT INTO reservations (num_guests, reservation_date, reservation_time, allergies, status) VALUES (?, ?, ?, ?, ?)';
  const values = [num_guests, reservation_date, reservation_time, allergies, 'pending'];
  
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const newReservation = { id: result.insertId, ...req.body, status: 'pending' };
      res.status(201).json(newReservation);
    }
  });
});

//--------------------------------- Requêtes pour récupérer les paramètres du restaurant définit par l'adm ------------------------

// Définir une route pour enregistrer les paramètres de restaurant dans la base de données
app.post('/settings', (req, res) => {
  const { capacity } = req.body;
  const sql = `UPDATE restaurant_settings_adm SET max_convives = ${capacity}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    console.log('Paramètres enregistrés dans la base de données.');
    res.send('Paramètres enregistrés dans la base de données.');
  });
});


app.get('/settings', (req, res) => {
  const sql = `SELECT max_convives FROM restaurant_settings_adm WHERE id = 0`;

  connection.query(sql, (error, result) => {
    if (error) throw error;else console.log('données bien récupéré')
    console.log('Récupération des paramètres depuis la base de données.');
    res.send(result[0]);
  });
});


// lancer le serveur Node.js
app.listen(3001, () => {
  console.log("Serveur Node.js démarré sur le port 3001");
});
