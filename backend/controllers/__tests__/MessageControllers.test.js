const MessageController = require('../MessageControllers');

describe('MessageController', () => {
  let messageController;
  let mockService;
  let mockRes;

  beforeEach(() => {
    mockService = {
      getAllMessages: jest.fn(),
      addMessage: jest.fn()
    };
    messageController = new MessageController(mockService);
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('getMessages', () => {
    it('should return messages when service call is successful', async () => {
      const mockMessages = [
        { id: 1, nombre: 'Test User', mensaje: 'Test Message', fecha: '2024-03-21' }
      ];
      mockService.getAllMessages.mockResolvedValue(mockMessages);

      await messageController.getMessages(mockRes);

      expect(mockService.getAllMessages).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockMessages);
    });

    it('should handle errors when service call fails', async () => {
      const error = new Error('Database error');
      mockService.getAllMessages.mockRejectedValue(error);

      await messageController.getMessages(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('postMessage', () => {
    it('should create a new message when valid data is provided', async () => {
      const mockData = {
        nombre: 'Test User',
        mensaje: 'Test Message'
      };
      const mockResult = {
        id: 1,
        ...mockData,
        fecha: '2024-03-21'
      };
      mockService.addMessage.mockResolvedValue(mockResult);

      await messageController.postMessage(mockData, mockRes);

      expect(mockService.addMessage).toHaveBeenCalledWith(mockData.nombre, mockData.mensaje);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = {
        nombre: 'Test User'
        // mensaje is missing
      };

      await messageController.postMessage(invalidData, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Faltan campos' });
    });

    it('should handle errors when service call fails', async () => {
      const mockData = {
        nombre: 'Test User',
        mensaje: 'Test Message'
      };
      const error = new Error('Database error');
      mockService.addMessage.mockRejectedValue(error);

      await messageController.postMessage(mockData, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});
