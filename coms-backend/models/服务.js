const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('服务', {
    '工号': {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: '工作人员',
        key: '工号'
      }
    },
    '客户号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '客户',
        key: '客户号'
      }
    }
  }, {
    sequelize,
    tableName: '服务',
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
      {
        name: "工号",
        using: "BTREE",
        fields: [
          { name: "工号" },
        ]
      },
    ]
  });
};
