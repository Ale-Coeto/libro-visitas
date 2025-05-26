class MessageController {
  constructor(service) {
    this.service = service;
  }

  async getMessages(res) {
    try {
      const data = await this.service.getAllMessages();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postMessage(data, res) {
    const { nombre, mensaje } = data;
    if (!nombre || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos' });
    }
    try {
      const result = await this.service.addMessage(nombre, mensaje);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = MessageController;