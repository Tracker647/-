const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('客户订单', {
    '客户号': {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: '客户',
        key: '客户号'
      }
    },
    '订单号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '订单',
        key: '订单号'
      }
    }
  }, {
    sequelize,
    tableName: '客户订单',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "订单号" },
        ]
      },
      {
        name: "客户号",
        using: "BTREE",
        fields: [
          { name: "客户号" },
        ]
      },
    ]
  });
};
