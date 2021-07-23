var _发票 = require("./发票.route");
var _商品 = require("./商品.route");
var _客户 = require("./客户.route");
var _客户订单 = require("./客户订单.route");
var _工作人员 = require("./工作人员.route");
var _支付 = require("./支付.route");
var _服务 = require("./服务.route");
var _订单 = require("./订单.route");
var _订单包含 = require("./订单包含.route");


function initRouters(app) {

    var 发票 = _发票(app);
    var 商品 = _商品(app);
    var 客户 = _客户(app);
    var 客户订单 = _客户订单(app);
    var 工作人员 = _工作人员(app);
    var 支付 = _支付(app);
    var 服务 = _服务(app);
    var 订单 = _订单(app);
    var 订单包含 = _订单包含(app);

}

module.exports = initRouters;
