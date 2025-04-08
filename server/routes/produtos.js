const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const { auth, adminAuth } = require('../middlewares/auth');

// Listar produtos (público)
router.get('/', async (req, res) => {
  try {
    const { categoria } = req.query;
    const query = categoria ? { categoria } : {};
    
    const produtos = await Produto.find(query);
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos' });
  }
});

// Criar produto (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar produto' });
  }
});

// Atualizar produto (admin)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    res.json(produto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto' });
  }
});

// Deletar produto (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
});

module.exports = router; 