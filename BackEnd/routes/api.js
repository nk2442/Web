/**
 * Routes API simplifiées
 */

const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const { MONGODB_URI, DB_NAME, MONGODB_OPTIONS } = require('../config/database');
const { hashPassword, verifyPassword } = require('../utils/securityUtils');

// Instance client MongoDB
let client;

/**
 * Établit une connexion à la base de données MongoDB
 */
const getDbConnection = async () => {
  if (client) {
    return { client, db: client.db(DB_NAME) };
  }
  
  try {
    console.log('Tentative de connexion à MongoDB...');
    client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS);
    await client.connect();
    console.log('Connexion à MongoDB établie avec succès');
    return { client, db: client.db(DB_NAME) };
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
};

/**
 * GET /api/test
 * Point de terminaison simple pour vérifier le bon fonctionnement de l'API
 */
router.get('/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement' });
});

/**
 * GET /api/user/check-session
 * Vérifie si l'utilisateur a une session active
 */
router.get('/user/check-session', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({
      success: true,
      user: req.session.user
    });
  }
  
  res.json({
    success: false,
    message: 'Aucune session active'
  });
});

/**
 * GET /api/user/logout
 * Déconnexion de l'utilisateur
 */
router.get('/user/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la déconnexion'
        });
      }
      
      res.json({
        success: true,
        message: 'Déconnexion réussie'
      });
    });
  } else {
    res.json({
      success: true,
      message: 'Aucune session active'
    });
  }
});

/**
 * PUT /api/user
 * Création d'un nouvel utilisateur
 */
router.put('/user', async (req, res) => {
  try {
    const { login, password, password2, firstname, lastname } = req.body;
    
    // Validation de base
    if (!login || !password || !password2 || !firstname || !lastname) {
      return res.status(400).json({
        success: false, 
        message: 'Tous les champs sont obligatoires'
      });
    }
    
    if (password !== password2) {
      return res.status(400).json({
        success: false,
        message: 'Les mots de passe ne correspondent pas'
      });
    }
    
    const { db } = await getDbConnection();
    const usersCollection = db.collection('users');
    
    // Vérification de l'unicité du login
    const existingUser = await usersCollection.findOne({ login });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Un utilisateur avec ce login existe déjà'
      });
    }
    
    // Hachage du mot de passe et création de l'utilisateur
    const hashedPassword = await hashPassword(password);
    
    const result = await usersCollection.insertOne({
      login,
      password: hashedPassword,
      firstname,
      lastname,
      role: 'user',
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      userId: result.insertedId
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

/**
 * POST /api/user/login
 * Connexion d'un utilisateur
 */
router.post('/user/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({
        success: false, 
        message: 'Identifiant et mot de passe requis'
      });
    }
    
    const { db } = await getDbConnection();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ login });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Identifiant ou mot de passe incorrect'
      });
    }
    
    const passwordMatch = await verifyPassword(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Identifiant ou mot de passe incorrect'
      });
    }
    
    const userData = {
      login: user.login,
      firstName: user.firstname,
      lastName: user.lastname,
      role: user.role,
      id: user._id
    };
    
    req.session.user = userData;
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: userData
    });
    
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

/**
 * Récupération de tous les messages
 */
router.get('/messages', async (req, res) => {
  try {
    const { db } = await getDbConnection();
    const messagesCollection = db.collection('messages');
    
    const messages = await messagesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

/**
 * Création d'un nouveau message
 */
router.post('/messages', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non connecté'
      });
    }

    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le message ne peut pas être vide'
      });
    }
    
    const { db } = await getDbConnection();
    const messagesCollection = db.collection('messages');
    
    const newMessage = {
      user: req.session.user.login,
      username: `${req.session.user.firstName} ${req.session.user.lastName}`,
      text,
      createdAt: new Date(),
      replies: []
    };
    
    const result = await messagesCollection.insertOne(newMessage);
    
    res.status(201).json({
      success: true,
      message: 'Message créé avec succès',
      messageId: result.insertedId,
      createdMessage: { ...newMessage, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Gestion de la fermeture de la connection
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('Connexion à MongoDB fermée');
  }
  process.exit(0);
});

module.exports = router;
