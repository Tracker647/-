module.exports = app => {
    const 服务 = require("../controllers/服务.controller");
    var router = require("express").Router();

    // 创建新服务
    router.post("/", 服务.create);

    //获取所有服务
    router.get("/", 服务.findAll);

    //由工号获取服务
    router.get("/:customerId", 服务.findOne);

    //  改变客户号对应的工号
    router.put("/customerId", 服务.update);

    // 由客户号删除对应服务
    router.delete("/:customerId", 服务.delete);

    // 删除所有服务
    router.delete("/", 服务.deleteAll);

    app.use('/api/service', router);
}