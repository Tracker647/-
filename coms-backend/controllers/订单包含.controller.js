const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _订单包含_ = models.订单包含;


// 建立并保存新的订单
exports.create = (req, res) => {

    // Validate request
    if (!req.body.订单包含_id) {
        res.status(400).send({
            message: "订单id不能为空!"
        });
        return;
    }

    // 创建新的订单数据
    const 订单包含 = {
        订单包含_id: req.body.订单包含_id,
        订单号: req.body.订单号,
        商品号: req.body.商品号,
        订购数量: req.body.订购数量,
        应付金额: req.body.应付金额
    };

    //将新订单数据保存入数据库
    _订单包含_.create(订单包含)
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
    const 订单包含_id = req.query.订单包含_id;
    var condition = 订单包含_id ? { 订单包含_id: { [Op.like]: `%${订单包含_id}%` } } : null;

    _订单包含_.findAll({ 订单包含_id: condition })
        .then(data => {
            console.log(data);
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
    const 订单包含_id = req.params.orderDetailId;
    _订单包含_.findByPk(订单包含_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取订单号为${订单包含_id}的订单。`
            })
        });
};

// 根据请求结果更新对应的订单
exports.update = (req, res) => {
    const 订单包含_id = req.params.orderDetailId;

    _订单包含_.update(req.body, {
        where: { 订单包含_id: 订单包含_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `订单号${订单包含_id}已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到订单号为${订单包含_id}的订单。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新订单id为${订单包含_id}的订单时出现错误.`
            });
        });
};

// 根据请求的订单id删除订单
exports.delete = (req, res) => {
    const 订单包含_id = req.params.orderDetailId;

    _订单包含_.destroy({
        where: { 订单包含_id: 订单包含_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `订单号${订单包含_id}已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除订单id为${订单包含_id}的订单，可能根本没有这个订单.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除订单id为${订单包含_id}的订单时出现错误.`
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    _订单包含_.destory({
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
