const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _发票_ = models.发票;


// 建立并保存新的发票
exports.create = (req, res) => {
    // Validate request
    if (!req.body.发票号) {
        res.status(400).send({
            message: "发票号不能为空!"
        });
        return;
    }
    // 创建新的发票数据
    const 发票 = {
        发票号: req.body.发票号,
        开单日期: req.body.开单日期,
        支付方式: req.body.支付方式
    };

    //将新订单数据保存入数据库
    _发票_.create(发票)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新订单时发生错误。"
            });
        });
};

// 获取所有发票数据.
exports.findAll = (req, res) => {
    const 发票号 = req.query.发票号;
    var condition = 发票号 ? { 发票号: { [Op.like]: `%${发票号}%` } } : null;

    _发票_.findAll({ 发票号: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存发票时发生错误。"
            })
        })
};

// 由订单号获取指定的订单
exports.findOne = (req, res) => {
    const 发票号 = req.params.ticketId;
    _发票_.findByPk(发票号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取发票号为${发票号}的发票。`
            })
        });
};

// 根据请求结果更新对应的发票
exports.update = (req, res) => {
    const 发票号 = req.params.ticketId;

    _发票_.update(req.body, {
        where: { 发票号: 发票号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `发票号${发票号}已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到发票号为${发票号}的发票。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新发票号为${发票号}的发票时出现错误.`
            });
        });
};

// 根据请求的订单id删除订单
exports.delete = (req, res) => {
    const 发票号 = req.params.ticketId;

    _发票_.destroy({
        where: { 发票号: 发票号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `发票号${发票号}已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除发票号为${发票号}的发票，可能根本没有这个发票.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除发票号为${发票号}的发票时出现错误.`
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    _发票_.destory({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个发票已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除发票时发生了未知错误。"
            })
        })
};
