class MessageHandlers {
  constructor(controller) {
    this.controller = controller;
  }

  async getMessages(req, res) {
    this.controller.getMessages(res); // no req needed here
  }

  async postMessage(req, res) {
    this.controller.postMessage(req.body, res); // pass just the data
  }
}

module.exports = MessageHandlers;