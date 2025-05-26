const MessageHandlers = require('../MessageHandlers');

describe('MessageHandlers', () => {
  let messageHandlers;
  let mockController;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockController = {
      getMessages: jest.fn(),
      postMessage: jest.fn()
    };
    messageHandlers = new MessageHandlers(mockController);
    mockReq = {
      body: {
        nombre: 'Test User',
        mensaje: 'Test Message'
      }
    };
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('getMessages', () => {
    it('should call controller.getMessages with response object', async () => {
      await messageHandlers.getMessages(mockReq, mockRes);
      expect(mockController.getMessages).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('postMessage', () => {
    it('should call controller.postMessage with request body and response object', async () => {
      await messageHandlers.postMessage(mockReq, mockRes);
      expect(mockController.postMessage).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle missing request body', async () => {
      mockReq.body = undefined;
      await messageHandlers.postMessage(mockReq, mockRes);
      expect(mockController.postMessage).toHaveBeenCalledWith(undefined, mockRes);
    });
  });
});
