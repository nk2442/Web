const request = require('supertest');
const app = require('../app');
const { getDbConnection, closeDbConnection } = require('../utils/dbConnection');

describe('API Routes', () => {
  // Nettoyer la base de données avant et après les tests
  beforeAll(async () => {
    const { db } = await getDbConnection();
    await db.collection('users').deleteMany({ login: 'testuser' });
  });
  
  afterAll(async () => {
    await closeDbConnection();
  });
  
  describe('GET /api/test', () => {
    it('should return a success message', async () => {
      const response = await request(app).get('/api/test');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'API fonctionne correctement');
    });
  });
  
  describe('PUT /api/user', () => {
    it('should create a new user', async () => {
      const userData = {
        login: 'testuser',
        password: 'password123',
        password2: 'password123',
        firstname: 'Test',
        lastname: 'User'
      };
      
      const response = await request(app)
        .put('/api/user')
        .send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Utilisateur créé avec succès');
      expect(response.body).toHaveProperty('userId');
    });
    
    it('should return error if passwords do not match', async () => {
      const userData = {
        login: 'testuser2',
        password: 'password123',
        password2: 'differentpassword',
        firstname: 'Test',
        lastname: 'User'
      };
      
      const response = await request(app)
        .put('/api/user')
        .send(userData);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Les mots de passe ne correspondent pas');
    });
  });
});
