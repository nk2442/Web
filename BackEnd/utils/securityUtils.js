const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Hache un mot de passe en utilisant bcrypt
 */
exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, saltRounds);
};

/**
 * Vérifie si un mot de passe correspond à sa version hachée
 */
exports.verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
