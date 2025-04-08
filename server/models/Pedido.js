const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Produto = require('./Produto');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'id'
    }
  },
  medidas_busto: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  medidas_cintura: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  medidas_quadril: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  medidas_altura: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  observacoes: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em_producao', 'concluido', 'cancelado'),
    defaultValue: 'pendente'
  }
});

// Definindo as associações
Pedido.belongsTo(User, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = Pedido; 