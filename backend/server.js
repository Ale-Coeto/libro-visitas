const express = require('express');
const cors = require('cors');
require('dotenv').config();

const messageRoutes = require('./api/route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/messages', messageRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor backend activo en http://localhost:${PORT}`));
