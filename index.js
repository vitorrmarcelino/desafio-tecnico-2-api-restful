require('dotenv').config();
const express = require('express');
const app = express();

// Banco de Dados
const connectToDatabase = require('./src/database/db');
connectToDatabase();

app.use(express.json());

// Rotas
const userRoutes = require('./src/routes/userRoutes');

app.get('/', (req, res) => res.json({ mensagem: 'Bem vindo a API' }));
app.use('/users', userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('O servidor está ligado');
});
