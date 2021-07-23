const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _服务_ = models.服务;


// 建立并保存新的服务
exports.create = (req, res) => {
    // Validate request
    if (!req.body.工号) {
        res.status(400).send({
            message: "工号不能为空!"
        });
        return;
    }
    console.log(req, res);
    // 创建新的服务数据
    const 服务 = {
        工号: req.body.工号,
        客户号: req.body.客户号,
    };

    //将新服务数据保存入数据库
    _服务_.create(服务)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新的服务关系时发生错误。"
            });
        });
};

// 获取所有服务数据.
exports.findAll = (req, res) => {
    console.log(req, res);
    const 客户号 = req.query.客户号;
    var condition = 客户号 ? { 客户号: { [Op.like]: `%${客户号}%` } } : null;

    _服务_.findAll({ 客户号: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存服务时发生错误。"
            })
        })
};

// 由客户号获取指定的服务数据
exports.findOne = (req, res) => {
    const 客户号 = req.params.customerId;
    _服务_.findByPk(客户号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取客户号为${客户号}的服务数据。`
            })
        });
};


// 由客户号更新指定的服务数据
exports.update = (req, res) => {
    const 客户号 = req.params.customerId;

    _服务_.update(req.body, {
        where: { 客户号: 客户号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `${客户号}的服务关系已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到要修改的这个服务关系。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新该服务关系时出现错误.`
            });
        });
};


exports.delete = (req, res) => {
    const 客户号 = req.params.customerId;

    _服务_.destroy({
        where: {  客户号: 客户号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `该服务关系已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除 ${客户号} 的服务关系，可能根本没有这个服务关系.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除 ${客户号} 的服务关系时出现错误.`
            });
        });
};

exports.deleteAll = (req, res) => {
    _服务_.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个服务关系已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除服务关系时发生未知错误"
            })
        })
};
