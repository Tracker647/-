const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('工作人员', {
    '工号': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '工作人名': {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '工作人员',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "工号" },
        ]
      },
    ]
  });
};
