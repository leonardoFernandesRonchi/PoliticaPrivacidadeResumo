const express = require('express');
const router = express.Router();
const { createPolitica, getPoliticas, getPoliticaById, deletePolitica, resumePolitics} = require('../controllers/politicaController');

// Rota para criar uma política
router.post('/politicas', createPolitica);

// Rota para listar todas as políticas
router.get('/politicas', getPoliticas);

// 🔥 Nova rota para buscar uma política pelo ID
router.get('/politicas/:id', getPoliticaById);

router.delete('/politicas/:id', deletePolitica);

router.post('/politicas/:id/resumo', resumePolitics);  // Chamada para resumir política


module.exports = router;
