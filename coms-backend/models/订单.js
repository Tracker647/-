const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('订单', {
    '订单号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '开单日期': {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '订单',
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
    ]
  });
};
