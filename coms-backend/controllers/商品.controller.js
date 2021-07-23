const { sequelize } = require("../config/sequelize.config");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Op = models.seqConfig.Sequelize.Op;
const _商品_ = models.商品;


// 建立并保存新的商品数据
exports.create = (req, res) => {
    // Validate request
    if (!req.body.商品号) {
        res.status(400).send({
            message: "商品号不能为空!"
        });
        return;
    }
    console.log(req, res);
    // 创建新的商品数据
    const 商品 = {
        商品号: req.body.商品号,
        商品名: req.body.商品名,
        商品单价: req.body.商品单价,
        商品库存: req.body.商品库存
    };

    //将新商品数据保存入数据库
    _商品_.create(商品)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "建立新的商品数据时发生错误。"
            });
        });
};

// 获取所有商品数据.
exports.findAll = (req, res) => {
    console.log(req, res);
    const 商品号 = req.query.商品号;
    var condition = 商品号 ? { 商品号: { [Op.like]: `%${商品号}%` } } : null;

    _商品_.findAll({ 商品号: condition })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "获取现存商品数据时发生错误。"
            })
        })
};

// 由商品号获取指定的商品数据
exports.findOne = (req, res) => {
    const 商品号 = req.params.productId;
    _商品_.findByPk(商品号)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `无法获取商品号为${商品号}的商品数据。`
            })
        });
};


// 由商品号更新指定的商品数据
exports.update = (req, res) => {
    const 商品号 = req.params.productId;

    _商品_.update(req.body, {
        where: { 商品号: 商品号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `商品号为${商品号}的商品数据已成功更新.`
                });
            } else {
                res.send({
                    message: `找不到要修改的这个商品数据。`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: `更新该商品数据时出现错误.`
            });
        });
};


exports.delete = (req, res) => {
    const 商品号 = req.params.productId;

    _商品_.destroy({
        where: { 商品号: 商品号 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `该商品数据已成功删除`
                });
            } else {
                res.send({
                    message: `无法删除 ${商品号} 的商品数据，可能根本没有这个商品数据.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `删除 ${商品号} 的商品数据时出现错误.`
            });
        });
};

exports.deleteAll = (req, res) => {
    _商品_.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} 个商品数据已成功删除。` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "删除商品数据时发生未知错误"
            })
        })
};
