const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('发票', {
    '发票号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '开单日期': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '支付方式': {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '发票',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "发票号" },
        ]
      },
    ]
  });
};
