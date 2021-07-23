module.exports = app => {
    const 客户 = require("../controllers/客户.controller");
    var router = require("express").Router();

    router.post("/", 客户.create);

    router.get("/", 客户.findAll);

    router.get("/:workerId", 客户.findOne);

    router.put("/:workerId", 客户.update);

    router.delete("/:workerId", 客户.delete);

    router.delete("/", 客户.deleteAll);

    app.use('/api/customer', router);
}