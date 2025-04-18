const express = require('express');
const app = express();
const politicaRoutes = require('./politicas-api/routes/politicaRoutes.js');
const sequelize = require('./politicas-api/config/database');
const cors = require('cors');

// Configuração CORS para desenvolvimento
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Para navegadores antigos
};

app.use(cors(corsOptions));

// Middleware para log de requisições (útil para debug)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

require('dotenv').config();
app.use(express.json());
app.use('/api', politicaRoutes);

const PORT = process.env.PORT || 3002;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Origens permitidas: ${corsOptions.origin.join(', ')}`);
  });
}).catch(err => {
  console.error('Erro ao conectar com o banco de dados:', err);
});