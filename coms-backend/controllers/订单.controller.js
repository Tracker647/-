const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _订单_ = models.订单;


// 建立并保存新的订单
exports.create = (req, res) => {

    // Validate request
    if (!req.body.订单号) {
        res.status(400).send({
            message: "订单号不能为空!"
        });
        return;
    }
    
    // 创建新的订单数据
    const 订单 = {
        订单号: req.body.订单号,
        开单日期: req.body.开单日期,
    };

    //将新订单数据保存入数据库
    _订单_.create(订单)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新订单时发生错误。"
            });
        });
};

// 获取所有订单数据.
exports.findAll = (req, res) => {

    // const 订单号 = req.query.订单号;
    // console.log(res.body);
    // var condition = 订单号 ? { 订单号: { [Op.like]: `%${订单号}%` } } : null;

    _订单_.findAll()
        .then(data => {
             res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存订单时发生错误。"
            })
        })
};

// 由订单号获取指定的订单
exports.findOne = (req, res) => {
    const 订单号 = req.params.orderId;
    _订单_.findByPk(订单号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取订单号为${订单号}的订单。`
            })
        });
};

// 根据请求结果更新对应的订单
exports.update = (req, res) => {
    const 订单号 = req.params.orderId;

    _订单_.update(req.body, {
        where: { 订单号: 订单号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `订单号${订单号}已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到订单号为${订单号}的订单。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新订单号为${订单号}的订单时发生错误：500。`
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const 订单号 = req.params.orderId;

    _订单_.destroy({
        where: { 订单号: 订单号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `订单号${订单号}已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除订单号为${订单号}的订单，可能根本没有这个订单.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    _订单_.destory({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个订单已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除订单时发生了未知错误。"
            })
        })
};
