const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _客户_ = models.客户;


// 建立并保存新的客户数据
exports.create = (req, res) => {
    // Validate request
    if (!req.body.客户号) {
        res.status(400).send({
            message: "客户号不能为空!"
        });
        return;
    }
    console.log(req, res);
    // 创建新的客户数据
    const 客户 = {
        客户号: req.body.客户号,
        客户姓名: req.body.客户姓名,
        电话: req.body.电话,
        地址: req.body.地址
    };

    //将新客户数据保存入数据库
    _客户_.create(客户)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新的客户数据时发生错误。"
            });
        });
};

// 获取所有客户数据.
exports.findAll = (req, res) => {
    console.log(req, res);
    const 客户号 = req.query.客户号;
    var condition = 客户号 ? { 客户号: { [Op.like]: `%${客户号}%` } } : null;

    _客户_.findAll({ 客户号: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存客户数据时发生错误。"
            })
        })
};

// 由客户号获取指定的客户数据
exports.findOne = (req, res) => {
    const 客户号 = req.params.customerId;
    _客户_.findByPk(客户号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取客户号为${客户号}的客户数据。`
            })
        });
};


// 由客户号更新指定的客户数据
exports.update = (req, res) => {
    const 客户号 = req.params.customerId;

    _客户_.update(req.body, {
        where: { 客户号: 客户号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `${客户号}的客户数据已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到要修改的这个客户数据。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新该客户数据时出现错误.`
            });
        });
};


exports.delete = (req, res) => {
    const 客户号 = req.params.customerId;

    _客户_.destroy({
        where: { 客户号: 客户号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `该客户数据已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除 ${客户号} 的客户数据，可能根本没有这个客户数据.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除 ${客户号} 的客户数据时出现错误.`
            });
        });
};

exports.deleteAll = (req, res) => {
    _客户_.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个客户数据已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除客户数据时发生未知错误"
            })
        })
};
