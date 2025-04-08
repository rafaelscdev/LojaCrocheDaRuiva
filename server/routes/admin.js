const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middlewares/auth');
const User = require('../models/User');
const Produto = require('../models/Produto');
const Pedido = require('../models/Pedido');

// Dashboard
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const [
      totalUsuarios,
      totalProdutos,
      totalPedidos,
      pedidosPendentes
    ] = await Promise.all([
      User.countDocuments(),
      Produto.countDocuments(),
      Pedido.countDocuments(),
      Pedido.countDocuments({ status: 'pendente' })
    ]);

    res.json({
      totalUsuarios,
      totalProdutos,
      totalPedidos,
      pedidosPendentes
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar dashboard' });
  }
});

// Estatísticas de vendas
router.get('/estatisticas', adminAuth, async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('produto', 'preco categoria');

    const estatisticas = {
      porCategoria: {},
      totalVendas: 0,
      mediaPedidos: 0
    };

    pedidos.forEach(pedido => {
      const categoria = pedido.produto.categoria;
      const preco = pedido.produto.preco;

      estatisticas.porCategoria[categoria] = (estatisticas.porCategoria[categoria] || 0) + preco;
      estatisticas.totalVendas += preco;
    });

    estatisticas.mediaPedidos = estatisticas.totalVendas / pedidos.length || 0;

    res.json(estatisticas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar estatísticas' });
  }
});

module.exports = router; 