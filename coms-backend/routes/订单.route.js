module.exports = app => {
    const 订单 = require("../controllers/订单.controller");
    var router = require("express").Router();

    // 创建新订单
    router.post("/", 订单.create);

    //获取所有订单
    router.get("/", 订单.findAll);

    //由订单号获取订单
    router.get("/:orderId", 订单.findOne);

    // 由订单号更新订单
    router.put("/:orderId", 订单.update);

    // 由订单号删除订单
    router.delete("/:orderId", 订单.delete);

    // 删除所有订单
    router.delete("/", 订单.deleteAll);

    app.use('/api/order', router);
}