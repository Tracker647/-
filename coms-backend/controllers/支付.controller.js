const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _支付_ = models.支付;


// 建立并保存新的支付数据
exports.create = (req, res) => {
    // Validate request
    if (!req.body.支付_id) {
        res.status(400).send({
            message: "支付_id不能为空!"
        });
        return;
    }
    console.log(req, res);
    // 创建新的支付数据
    const 支付 = {
        支付_id: req.body.支付_id,
        订单号: req.body.订单号,
        发票号: req.body.发票号,
        合计金额: req.body.合计金额
    };

    //将新支付数据保存入数据库
    _支付_.create(支付)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新的支付数据时发生错误。"
            });
        });
};

// 获取所有支付数据.
exports.findAll = (req, res) => {
    console.log(req, res);
    const 支付_id = req.query.支付_id;
    var condition = 支付_id ? { 支付_id: { [Op.like]: `%${支付_id}%` } } : null;

    _支付_.findAll({ 支付_id: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存支付数据时发生错误。"
            })
        })
};

// 由支付_id获取指定的支付数据
exports.findOne = (req, res) => {
    const 支付_id = req.params.paybyId;
    _支付_.findByPk(支付_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取支付_id为${支付_id}的支付数据。`
            })
        });
};


// 由支付_id更新指定的支付数据
exports.update = (req, res) => {
    const 支付_id = req.params.paybyId;

    _支付_.update(req.body, {
        where: { 支付_id: 支付_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `支付_id为${支付_id}的支付数据已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到要修改的这个支付数据。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新该支付数据时出现错误.`
            });
        });
};


exports.delete = (req, res) => {
    const 支付_id = req.params.paybyId;

    _支付_.destroy({
        where: { 支付_id: 支付_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `该支付数据已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除 ${支付_id} 的支付数据，可能根本没有这个支付数据.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除 ${支付_id} 的支付数据时出现错误.`
            });
        });
};

exports.deleteAll = (req, res) => {
    _支付_.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个支付数据已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除支付数据时发生未知错误"
            })
        })
};
