// importer les modules nécessaires
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const Jimp = require('jimp');
const uuid = require('uuid').v4;


// initialiser l'application express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// créer une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'root',
  database: 'restaurant'
});

// vérifier la connexion à la base de données MySQL
connection.connect((error) => {
  if (error) {
    console.error('Erreur lors de la connexion à la base de données MySQL :', error);
  } else {
    console.log('Connexion à la base de données MySQL réussie');
  }
});

// définir la route User de l'API RESTful
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données de la table des utilisateurs :', error);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

// Je poste dans la table des Users

app.post('/users', (req, res) => {
  const { nom, prenom, email, mot_de_passe } = req.body;
  const sql = `INSERT INTO users (nom, prenom, email, mot_de_passe) VALUES ('${nom}', '${prenom}', '${email}', '${mot_de_passe}')`;

  connection.query(sql, (error, result) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données dans la table des utilisateurs :', error);
      res.sendStatus(500);
    } else {
      console.log('Les données ont été insérées avec succès dans la table des utilisateurs');
      res.sendStatus(201);
    }
  });
});

//Pour la connexion je définis une route

app.post('/users/connexion', (req, res) => {
  // req.body récupère la requete que l'on envoie au server
  const { email, mot_de_passe } = req.body;
  const sql = `SELECT * FROM users WHERE email = '${email}' AND mot_de_passe = '${mot_de_passe}'`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données de la table des utilisateurs :', error);
      res.sendStatus(500);
    } else if (results.length === 0) {
      console.error('Aucun utilisateur correspondant aux informations de connexion fournies');
      res.sendStatus(401);
    } else {
      console.log('Connexion réussie');
      res.sendStatus(200);
    }
  });
});


// ----------------------------------------------Requete pour les images --------------------------------------------------------

// Endpoint pour récupérer toutes les images
app.get('/images', (req, res) => {
  const sql = 'SELECT * FROM images';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint pour récupérer une image spécifique
app.get('/images/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM images WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Endpoint pour ajouter une nouvelle image
app.post('/images', (req, res) => {
  const image = req.body.image;
  const title = req.body.title;
  const nom_du_fichier = req.body.nom_du_fichier;
  const url_du_fichier = req.body.url_du_fichier;

  const sql = 'INSERT INTO images (image, title, nom_du_fichier, url_du_fichier) VALUES (?, ?, ?, ?)';
  connection.query(sql, [image, title, nom_du_fichier, url_du_fichier], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint pour mettre à jour une image existante
app.put('/images/:id', (req, res) => {
  const id = req.params.id;
  const image = req.body.image;
  const title = req.body.title;
  const nom_du_fichier = req.body.nom_du_fichier;
  const url_du_fichier = req.body.url_du_fichier;

  const sql = 'UPDATE images SET image = ?, title = ?, nom_du_fichier = ?, url_du_fichier = ? WHERE id = ?';
  connection.query(sql, [image, title, nom_du_fichier, url_du_fichier, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint pour supprimer une image
app.delete('/images/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM images WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// lancer le serveur Node.js
app.listen(3001, () => {
  console.log('Serveur Node.js démarré sur le port 3001');
});
