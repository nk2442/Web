/**
 * Configuration de l'application Express
 * Fichier principal pour la configuration du serveur backend,
 * incluant les middlewares et les routes
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const apiRoutes = require('./routes/api');

// Initialisation de l'application Express
const app = express();

// Configuration des middlewares essentiels
app.use(express.json());  // Analyse du corps JSON des requêtes
app.use(cors({
  origin: 'http://localhost:5173',  // Autorise les requêtes du frontend en développement
  credentials: true  // Permet l'utilisation des cookies d'authentification
}));

// Middleware de journalisation pour le débogage
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configuration de la gestion des sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'cle_secrete_par_defaut',
  resave: false,  // Ne pas sauvegarder la session si elle n'est pas modifiée
  saveUninitialized: false,  // Ne pas créer de session jusqu'à ce que quelque chose soit stocké
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Cookies sécurisés en production
    maxAge: 24 * 60 * 60 * 1000  // Expiration après 24 heures
  }
}));

// Montage des routes API
app.use('/api', apiRoutes);

// Route racine pour vérifier l'état du serveur
app.get('/', (req, res) => {
  res.send('Serveur backend opérationnel');
});

// Gestion des routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route non trouvée' 
  });
});

// Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
