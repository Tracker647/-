module.exports = app => {
    const 客户订单 = require("../controllers/客户订单.controller");
    var router = require("express").Router();

    router.post("/", 客户订单.create);

    router.get("/", 客户订单.findAll);

    router.get("/:orderId", 客户订单.findOne);

    router.put("/:orderId", 客户订单.update);

    router.delete("/:orderId", 客户订单.delete);

    router.delete("/", 客户订单.deleteAll);

    app.use('/api/customerOrder', router);
}