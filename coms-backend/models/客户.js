const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('客户', {
    '客户号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '客户姓名': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '电话': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '地址': {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '客户',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "客户号" },
        ]
      },
    ]
  });
};
