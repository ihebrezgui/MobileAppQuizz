const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Importez votre routeur d'authentification

const app = express();
app.use(cors({
  origin: 'http://localhost:8081', // Assurez-vous que cette URL correspond à celle de votre application React Native
  methods: ['GET', 'POST' , 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Access-Token', 'X-Key'],
}));



// Middleware body-parser pour analyser les corps des requêtes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS pour autoriser toutes les origines (à ajuster en production)
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase1', {

})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur de connexion MongoDB :', err));

// Utilisez votre routeur d'authentification pour les routes /signup et /login
app.use('/', authRoutes);

// Port d'écoute du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
