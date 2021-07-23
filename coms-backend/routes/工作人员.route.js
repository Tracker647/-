module.exports = app => {
    const 工作人员 = require("../controllers/工作人员.controller");
    var router = require("express").Router();

    router.post("/", 工作人员.create);

    router.get("/", 工作人员.findAll);

    router.get("/:workerId", 工作人员.findOne);

    router.put("/:workerId", 工作人员.update);

    router.delete("/:workerId", 工作人员.delete);

    router.delete("/", 工作人员.deleteAll);

    app.use('/api/worker', router);
}