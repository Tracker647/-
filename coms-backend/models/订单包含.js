const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('订单包含', {
    '订单包含_id': {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '订单号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '订单',
        key: '订单号'
      }
    },
    '商品号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '商品',
        key: '商品号'
      }
    },
    '订购数量': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '应付金额': {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '订单包含',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "订单包含_id" },
          { name: "订单号" },
          { name: "商品号" },
        ]
      },
      {
        name: "订单号",
        using: "BTREE",
        fields: [
          { name: "订单号" },
        ]
      },
      {
        name: "商品号",
        using: "BTREE",
        fields: [
          { name: "商品号" },
        ]
      },
    ]
  });
};
