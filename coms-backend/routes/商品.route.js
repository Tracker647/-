module.exports = app => {
    const 商品 = require("../controllers/商品.controller");
    var router = require("express").Router();

    router.post("/", 商品.create);

    router.get("/", 商品.findAll);

    router.get("/:productId", 商品.findOne);

    router.put("/:productId", 商品.update);

    router.delete("/:productId", 商品.delete);

    router.delete("/", 商品.deleteAll);

    app.use('/api/product', router);
}