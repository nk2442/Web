/**
 * Point d'entrée du serveur
 * Ce fichier démarre le serveur Express
 */

const app = require('./app');

// Port d'écoute du serveur
const PORT = process.env.PORT || 8000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
  console.error('Erreur non capturée:', err);
  process.exit(1); // Sortie avec code d'erreur
});

process.on('unhandledRejection', (err) => {
  console.error('Promesse rejetée non gérée:', err);
  process.exit(1); // Sortie avec code d'erreur
});
