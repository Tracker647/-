module.exports = app => {
    const 支付 = require("../controllers/支付.controller");
    var router = require("express").Router();

    router.post("/", 支付.create);

    router.get("/", 支付.findAll);

    router.get("/:paybyId", 支付.findOne);

    router.put("/:paybyId", 支付.update);

    router.delete("/:paybyId", 支付.delete);

    router.delete("/", 支付.deleteAll);

    app.use('/api/payby', router);
}