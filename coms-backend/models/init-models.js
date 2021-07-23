var DataTypes = require("sequelize").DataTypes;
var _发票 = require("./发票");
var _商品 = require("./商品");
var _客户 = require("./客户");
var _客户订单 = require("./客户订单");
var _工作人员 = require("./工作人员");
var _支付 = require("./支付");
var _服务 = require("./服务");
var _订单 = require("./订单");
var _订单包含 = require("./订单包含");
var _seqConfig = require("../config/sequelize.config");


function initModels(sequelize) {
  var seqConfig = _seqConfig;
  var 发票 = _发票(sequelize, DataTypes);
  var 商品 = _商品(sequelize, DataTypes);
  var 客户 = _客户(sequelize, DataTypes);
  var 客户订单 = _客户订单(sequelize, DataTypes);
  var 工作人员 = _工作人员(sequelize, DataTypes);
  var 支付 = _支付(sequelize, DataTypes);
  var 服务 = _服务(sequelize, DataTypes);
  var 订单 = _订单(sequelize, DataTypes);
  var 订单包含 = _订单包含(sequelize, DataTypes);

  商品.belongsToMany(订单, { as: '订单号_订单s', through: 订单包含, foreignKey: "商品号", otherKey: "订单号" });
  订单.belongsToMany(商品, { as: '商品号_商品s', through: 订单包含, foreignKey: "订单号", otherKey: "商品号" });
  支付.belongsTo(发票, { as: "发票号_发票", foreignKey: "发票号"});
  发票.hasMany(支付, { as: "支付s", foreignKey: "发票号"});
  订单包含.belongsTo(商品, { as: "商品号_商品", foreignKey: "商品号"});
  商品.hasMany(订单包含, { as: "订单包含s", foreignKey: "商品号"});
  客户订单.belongsTo(客户, { as: "客户号_客户", foreignKey: "客户号"});
  客户.hasMany(客户订单, { as: "客户订单s", foreignKey: "客户号"});
  服务.belongsTo(客户, { as: "客户号_客户", foreignKey: "客户号"});
  客户.hasOne(服务, { as: "服务", foreignKey: "客户号"});
  服务.belongsTo(工作人员, { as: "工号_工作人员", foreignKey: "工号"});
  工作人员.hasMany(服务, { as: "服务s", foreignKey: "工号"});
  客户订单.belongsTo(订单, { as: "订单号_订单", foreignKey: "订单号"});
  订单.hasOne(客户订单, { as: "客户订单", foreignKey: "订单号"});
  订单包含.belongsTo(订单, { as: "订单号_订单", foreignKey: "订单号"});
  订单.hasMany(订单包含, { as: "订单包含s", foreignKey: "订单号"});

  return {
    seqConfig,
    发票,
    商品,
    客户,
    客户订单,
    工作人员,
    支付,
    服务,
    订单,
    订单包含,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
