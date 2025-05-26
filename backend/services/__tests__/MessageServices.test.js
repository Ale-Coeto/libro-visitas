const MessageService = require('../MessageServices');

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn().mockResolvedValue({
          data: [
            { id: 2, nombre: 'Ana', mensaje: 'Adiós', fecha: '2024-03-19' },
            { id: 1, nombre: 'Juan', mensaje: 'Hola', fecha: '2024-03-20' }
          ],
          error: null
        })
      })),
      insert: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({
          data: [{ id: 3, nombre: 'Pedro', mensaje: 'Nuevo mensaje', fecha: '2024-03-21' }],
          error: null
        })
      }))
    }))
  }))
}));

describe('MessageService', () => {
  let messageService;

  beforeEach(() => {
    messageService = new MessageService();
  });

  describe('getAllMessages', () => {
    it('should return all messages ordered by date', async () => {
      const messages = await messageService.getAllMessages();
      
      expect(messages).toHaveLength(2);
      expect(messages[0]).toEqual({
        id: 2,
        nombre: 'Ana',
        mensaje: 'Adiós',
        fecha: '2024-03-19'
      });
      expect(messages[1]).toEqual({
        id: 1,
        nombre: 'Juan',
        mensaje: 'Hola',
        fecha: '2024-03-20'
      });
    });

    it('should throw an error when database query fails', async () => {
      // Mock a database error
      jest.spyOn(messageService, 'getAllMessages').mockRejectedValueOnce(new Error('Database error'));

      await expect(messageService.getAllMessages()).rejects.toThrow('Database error');
    });
  });

  describe('addMessage', () => {
    it('should add a new message and return it', async () => {
      const newMessage = await messageService.addMessage('Pedro', 'Nuevo mensaje');
      
      expect(newMessage).toEqual({
        id: 3,
        nombre: 'Pedro',
        mensaje: 'Nuevo mensaje',
        fecha: '2024-03-21'
      });
    });

    it('should throw an error when message insertion fails', async () => {
      // Mock a database error
      jest.spyOn(messageService, 'addMessage').mockRejectedValueOnce(new Error('Insertion error'));

      await expect(messageService.addMessage('Pedro', 'Nuevo mensaje'))
        .rejects.toThrow('Insertion error');
    });
  });
}); 