/**
 * Configuration de la connexion à MongoDB
 * Ce fichier centralise les paramètres de connexion à la base de données
 */

// URI de connexion MongoDB (préfère l'env ou utilise une valeur par défaut)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ASSO';

// Nom de la base de données
const DB_NAME = process.env.DB_NAME || 'ASSO';

// Options de connexion MongoDB
// Ces paramètres optimisent la fiabilité et les performances de la connexion
const MONGODB_OPTIONS = {
  retryWrites: true,
  w: "majority",
  connectTimeoutMS: parseInt(process.env.MONGODB_CONNECT_TIMEOUT) || 30000,
  socketTimeoutMS: parseInt(process.env.MONGODB_SOCKET_TIMEOUT) || 45000
};

module.exports = {
  MONGODB_URI,
  DB_NAME,
  MONGODB_OPTIONS
};
