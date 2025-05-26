const express = require('express');
const router = express.Router();
const messageRoutes = require('../routes/MessageRoutes');

router.use('/', messageRoutes);

module.exports = router;
