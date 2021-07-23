const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _工作人员_ = models.工作人员;


// 建立并保存新的工作人员
exports.create = (req, res) => {
    // Validate request
    if (!req.body.工号) {
        res.status(400).send({
            message: "工号不能为空!"
        });
        return;
    }
    console.log(req, res);
    // 创建新的工作人员数据
    const 工作人员 = {
        工号: req.body.工号,
        工作人名: req.body.工作人名,
    };

    //将新工作人员数据保存入数据库
    _工作人员_.create(工作人员)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新的工作人员数据时发生错误。"
            });
        });
};

// 获取所有工作人员数据.
exports.findAll = (req, res) => {
    console.log(req, res);
    const 工号 = req.query.工号;
    var condition = 工号 ? { 工号: { [Op.like]: `%${工号}%` } } : null;

    _工作人员_.findAll({ 工号: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存工作人员数据时发生错误。"
            })
        })
};

// 由工号获取指定的工作人员数据
exports.findOne = (req, res) => {
    const 工号 = req.params.workerId;
    _工作人员_.findByPk(工号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取工号为${工号}的工作人员数据。`
            })
        });
};


// 由工号更新指定的工作人员数据
exports.update = (req, res) => {
    const 工号 = req.params.workerId;

    _工作人员_.update(req.body, {
        where: { 工号: 工号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `${工号}的工作人员数据已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到要修改的这个工作人员数据。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新该工作人员数据时出现错误.`
            });
        });
};


exports.delete = (req, res) => {
    const 工号 = req.params.workerId;

    _工作人员_.destroy({
        where: { 工号: 工号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `该工作人员数据已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除 ${工号} 的工作人员数据，可能根本没有这个工作人员数据.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除 ${工号} 的工作人员数据时出现错误.`
            });
        });
};

exports.deleteAll = (req, res) => {
    _工作人员_.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个工作人员数据已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除工作人员数据时发生未知错误"
            })
        })
};
