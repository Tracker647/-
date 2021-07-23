module.exports = app => {
    const 订单包含 = require("../controllers/订单包含.controller");
    var router = require("express").Router();

    // 创建新订单
    router.post("/", 订单包含.create);

    //获取所有订单
    router.get("/", 订单包含.findAll);

    //由订单号获取订单
    router.get("/:orderDetailId", 订单包含.findOne);

    // 由订单号更新订单
    router.put("/:orderDetailId", 订单包含.update);

    // 由订单号删除订单
    router.delete("/:orderDetailId", 订单包含.delete);

    // 删除所有订单
    router.delete("/", 订单包含.deleteAll);

    app.use('/api/orderDetail', router);
}