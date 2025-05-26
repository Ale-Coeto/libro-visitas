const request = require('supertest');
const express = require('express');
const MessageRoutes = require('../MessageRoutes');

describe('Message Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/messages', MessageRoutes);
  });

  describe('GET /api/messages', () => {
    it('should return all messages', async () => {
      const response = await request(app)
        .get('/api/messages')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should handle server errors', async () => {
      // Mock the service to throw an error
      const MessageService = require('../../services/MessageServices');
      jest.spyOn(MessageService.prototype, 'getAllMessages')
        .mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/messages')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('POST /api/messages', () => {
    it('should create a new message', async () => {
      const newMessage = {
        nombre: 'Test User',
        mensaje: 'Test Message'
      };

      const response = await request(app)
        .post('/api/messages')
        .send(newMessage)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('nombre', newMessage.nombre);
      expect(response.body).toHaveProperty('mensaje', newMessage.mensaje);
      expect(response.body).toHaveProperty('fecha');
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidMessage = {
        nombre: 'Test User'
        // mensaje is missing
      };

      const response = await request(app)
        .post('/api/messages')
        .send(invalidMessage)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Faltan campos');
    });

    it('should handle server errors', async () => {
      // Mock the service to throw an error
      const MessageService = require('../../services/MessageServices');
      jest.spyOn(MessageService.prototype, 'addMessage')
        .mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/api/messages')
        .send({
          nombre: 'Test User',
          mensaje: 'Test Message'
        })
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });
}); 