const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _客户订单_ = models.客户订单;


// 建立并保存新的客户订单数据
exports.create = (req, res) => {
    // Validate request
    if (!req.body.订单号) {
        res.status(400).send({
            message: "订单号不能为空!"
        });
        return;
    }
    console.log(req, res);
    // 创建新的客户订单数据
    const 客户订单 = {
        客户号: req.body.客户号,
        订单号: req.body.订单号
    };

    //将新客户订单数据保存入数据库
    _客户订单_.create(客户订单)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新的客户订单数据时发生错误。"
            });
        });
};

// 获取所有客户订单数据.
exports.findAll = (req, res) => {
    console.log(req, res);
    const 订单号 = req.query.订单号;
    var condition = 订单号 ? { 订单号: { [Op.like]: `%${订单号}%` } } : null;

    _客户订单_.findAll({ 订单号: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存客户订单数据时发生错误。"
            })
        })
};

// 由订单号获取指定的客户订单数据
exports.findOne = (req, res) => {
    const 订单号 = req.params.customerId;
    _客户订单_.findByPk(订单号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取订单号为${订单号}的客户订单数据。`
            })
        });
};


// 由订单号更新指定的客户订单数据
exports.update = (req, res) => {
    const 订单号 = req.params.customerId;

    _客户订单_.update(req.body, {
        where: { 订单号: 订单号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `订单号为${订单号}的客户订单数据已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到要修改的这个客户订单数据。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新该客户订单数据时出现错误.`
            });
        });
};


exports.delete = (req, res) => {
    const 订单号 = req.params.customerId;

    _客户订单_.destroy({
        where: { 订单号: 订单号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `该客户订单数据已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除 ${订单号} 的客户订单数据，可能根本没有这个客户订单数据.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除 ${订单号} 的客户订单数据时出现错误.`
            });
        });
};

exports.deleteAll = (req, res) => {
    _客户订单_.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个客户订单数据已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除客户订单数据时发生未知错误"
            })
        })
};
