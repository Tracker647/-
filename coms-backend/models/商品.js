const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('商品', {
    '商品号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '商品名': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '商品单价': {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    '商品库存': {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '商品',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "商品号" },
        ]
      },
    ]
  });
};
