/**
 * Utilitaire de connexion à la base de données MongoDB
 * Ce module gère la connexion MongoDB et la réutilise entre les requêtes
 */

const { MongoClient } = require('mongodb');
const { MONGODB_URI, DB_NAME, MONGODB_OPTIONS } = require('../config/database');

// Instance client MongoDB partagée
let client;

/**
 * Établit une connexion à la base de données MongoDB
 * Réutilise la connexion existante si disponible
 * @returns {Promise<Object>} Objet contenant le client et la base de données
 */
exports.getDbConnection = async () => {
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
 * Ferme proprement la connexion à MongoDB
 */
exports.closeDbConnection = async () => {
  if (client) {
    await client.close();
    client = null;
    console.log('Connexion à MongoDB fermée proprement');
  }
};
