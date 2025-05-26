const express = require('express');
const router = express.Router();

const MessageService = require('../services/MessageService');
const MessageController = require('../controllers/MessageController');
const MessageHandlers = require('../handlers/MessageHandlers');

const service = new MessageService();
const controller = new MessageController(service);
const handler = new MessageHandlers(controller);

router.get('/', handler.getMessages.bind(handler));
router.post('/', handler.postMessage.bind(handler));

module.exports = router;