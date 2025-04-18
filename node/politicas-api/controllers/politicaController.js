const Politica = require('../models/politica');
const axios = require('axios');
require('dotenv').config();


const resumePolitics = async (req, res) => {
  const { id } = req.params;

  try {
    const politica = await Politica.findByPk(id);

    if (!politica) return res.status(404).json({ message: 'Política não encontrada' });
    if (!politica.texto || politica.texto.trim() === '') {
      return res.status(400).json({ message: 'O texto da política está vazio' });
    }

    const prompt = `
Resuma de forma clara, profissional e completa a seguinte política de privacidade.

Seu resumo deve conter pelo menos 15 linhas (300–500 palavras) e abordar:

Quais dados são coletados

Finalidade da coleta

Compartilhamento de dados com terceiros

Direitos dos usuários sobre seus dados

Medidas de segurança adotadas

Aspectos legais e conformidade com a LGPD ou outras leis

Evite frases genéricas. Estruture o texto em tópicos com títulos destacados, separados por linhas em branco. Use negrito para os títulos dos tópicos e quebre os parágrafos quando necessário para facilitar a leitura.
""" 
${politica.texto}
"""`;

    const resposta = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-large-2402',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em escrever resumos formais e estruturados de políticas de uso.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 200000
      }
    );

    const resumo = resposta.data.choices[0].message.content;
    res.status(200).json({
      id: politica.id,
      resumo,
      textoOriginal: politica.texto
    });

  } catch (err) {
    console.error('Erro ao gerar resumo:', err);
    res.status(500).json({
      message: 'Erro ao gerar resumo',
      error: err.response?.data || err.message
    });
  }
};


const deletePolitica = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      message: 'ID inválido',
      details: 'O ID deve ser um número válido'
    });
  }

  try {
    const politica = await Politica.findByPk(id);

    if (!politica) {
      return res.status(404).json({ message: 'Política não encontrada' });
    }

    await politica.destroy(); 
    res.status(200).json({ message: 'Política deletada com sucesso' });
  } catch (err) {
    console.error(`Erro ao deletar política ID ${id}:`, err);
    res.status(500).json({ message: 'Erro ao deletar política', error: err.message });
  }
};

const createPolitica = async (req, res) => {
  const { conteudo } = req.body;

  if (!conteudo) {
    return res.status(400).json({ message: 'Campo "conteudo" é obrigatório' });
  }

  try {
    const politica = await Politica.create({ texto: conteudo });
    res.status(201).json({ message: 'Política criada com sucesso', data: politica });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar política', error: err.message });
  }
};

const getPoliticas = async (req, res) => {
  try {
    console.log('Tentando buscar todas as políticas...'); 
    const politicas = await Politica.findAll();
    
    if (!politicas) {
      console.log('Nenhuma política encontrada'); 
      return res.status(404).json({ message: 'Nenhuma política encontrada' });
    }
    
    console.log('Políticas encontradas:', politicas);
    res.status(200).json({ data: politicas });
  } catch (err) {
    console.error('Erro ao recuperar políticas:', err.message); 
    res.status(500).json({ message: 'Erro ao recuperar políticas', error: err.message });
  }
};

const getPoliticaById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      details: 'O ID deve ser um número válido',
    });
  }

  try {
    console.log(`[${new Date().toISOString()}] Buscando política com ID: ${id}`);

    const politica = await Politica.findByPk(id);

    if (!politica) {
      console.warn(`Política não encontrada para ID: ${id}`);
      return res.status(404).json({
        message: 'Política não encontrada',
        suggestion: 'Verifique se o ID está correto e se a política existe no banco de dados',
      });
    }

    console.log('Política encontrada:', politica.toJSON());
    res.status(200).json({
      success: true,
      data: politica.toJSON(),  
    });

  } catch (err) {
    console.error(`Erro ao buscar política ID ${id}:`, err);
    res.status(500).json({
      message: 'Erro interno ao buscar política',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      requestId: req.requestId,  
    });
  }
};



module.exports = { createPolitica, getPoliticas, getPoliticaById, deletePolitica, resumePolitics }
