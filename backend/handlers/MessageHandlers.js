class MessageHandlers {
  constructor(controller) {
    this.controller = controller;
  }

  async getMessages(req, res) {
    this.controller.getMessages(res);
  }

  async postMessage(req, res) {
    this.controller.postMessage(req.body, res);
  }
}

module.exports = MessageHandlers;