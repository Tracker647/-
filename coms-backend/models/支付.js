const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('支付', {
    '支付_id': {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '订单号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '发票号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '发票',
        key: '发票号'
      }
    },
    '合计金额': {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '支付',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "支付_id" },
          { name: "订单号" },
          { name: "发票号" },
        ]
      },
      {
        name: "发票号",
        using: "BTREE",
        fields: [
          { name: "发票号" },
        ]
      },
    ]
  });
};
