/**
 * Script utilitaire pour la création d'utilisateurs de test
 * 
 * Ce script permet de créer rapidement des comptes utilisateur et administrateur
 * pour faciliter les tests de l'application sans passer par l'interface d'inscription.
 * 
 * Utilisation: node scripts/creer-utilisateur-test.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config();

// Paramètres de connexion à la base de données
const MONGODB_URI = 'mongodb://localhost:27017/ASSO';
const DB_NAME = 'ASSO';

/**
 * Fonction principale: création des utilisateurs de test
 * @returns {Promise<boolean>} Succès ou échec de l'opération
 */
async function creerUtilisateurTest() {
  let client;
  
  try {
    console.log('Tentative de connexion à MongoDB...');
    
    // Initialisation du client MongoDB
    client = new MongoClient(MONGODB_URI);
    
    // Établissement de la connexion
    await client.connect();
    console.log('✅ Connexion établie avec succès !');
    
    // Référence à la collection des utilisateurs
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    
    // Vérification et création de l'utilisateur de test standard
    const utilisateurExistant = await usersCollection.findOne({ login: 'test' });
    
    if (utilisateurExistant) {
      console.log('✅ L\'utilisateur de test existe déjà:');
      console.log({
        login: utilisateurExistant.login,
        role: utilisateurExistant.role,
        nom: utilisateurExistant.firstname,
        prénom: utilisateurExistant.lastname
      });
    } else {
      // Création de l'utilisateur test
      const resultat = await usersCollection.insertOne({
        login: 'test',
        password: 'test123',  // Note: en production, ce mot de passe devrait être haché
        firstname: 'Utilisateur',
        lastname: 'Test',
        role: 'user',
        createdAt: new Date()
      });
      
      console.log('✅ Utilisateur de test créé avec ID:', resultat.insertedId);
    }
    
    // Vérification et création de l'utilisateur administrateur
    const adminExistant = await usersCollection.findOne({ login: 'admin' });
    
    if (adminExistant) {
      console.log('✅ L\'administrateur existe déjà');
    } else {
      const resultat = await usersCollection.insertOne({
        login: 'admin',
        password: 'admin123',  // Note: en production, ce mot de passe devrait être haché
        firstname: 'Admin',
        lastname: 'Système',
        role: 'admin',
        createdAt: new Date()
      });
      
      console.log('✅ Administrateur créé avec ID:', resultat.insertedId);
    }
    
    // Affichage des identifiants de test
    console.log('\n🔑 Identifiants de connexion:');
    console.log('  - Utilisateur normal: login = test, mot de passe = test123');
    console.log('  - Administrateur: login = admin, mot de passe = admin123');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  } finally {
    // Fermeture de la connexion dans tous les cas
    if (client) {
      await client.close();
      console.log('\nConnexion fermée');
    }
  }
}

// Exécution du script avec gestion des erreurs
creerUtilisateurTest()
  .then(() => {
    console.log('Script terminé avec succès');
    process.exit(0);
  })
  .catch(err => {
    console.error('Erreur critique dans l\'exécution du script:', err);
    process.exit(1);
  });
