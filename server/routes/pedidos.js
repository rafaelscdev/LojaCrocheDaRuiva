const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const { auth, adminAuth } = require('../middlewares/auth');

// Criar pedido (usuário autenticado)
router.post('/', auth, async (req, res) => {
  try {
    const pedido = new Pedido({
      ...req.body,
      usuario: req.user._id
    });
    
    await pedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar pedido' });
  }
});

// Listar pedidos do usuário
router.get('/meus-pedidos', auth, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.user._id })
      .populate('produto', 'nome preco imagem');
    
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pedidos' });
  }
});

// Listar todos os pedidos (admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('usuario', 'nome email')
      .populate('produto', 'nome preco imagem');
    
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pedidos' });
  }
});

// Atualizar status do pedido (admin)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar status do pedido' });
  }
});

module.exports = router; 