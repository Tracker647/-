module.exports = app => {
    const 发票 = require("../controllers/发票.controller");
    var router = require("express").Router();

    // 创建新订单
    router.post("/", 发票.create);

    //获取所有订单
    router.get("/", 发票.findAll);

    //由订单号获取订单
    router.get("/:ticketId", 发票.findOne);

    // 由订单号更新订单
    router.put("/:ticketId", 发票.update);

    // 由订单号删除订单
    router.delete("/:ticketId", 发票.delete);

    // 删除所有订单
    router.delete("/", 发票.deleteAll);

    app.use('/api/ticket', router);
}