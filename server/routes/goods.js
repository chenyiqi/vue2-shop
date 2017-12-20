var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('./../models/goods');
//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_shop');
mongoose.connection.on('connected', function() {
    console.log('MongoDB connected success.');
});
mongoose.connection.on('error', function() {
    console.log('MongoDB connected fail.');
});


/* GET users listing. */
router.get('/', function(req, res, next) {
    let page = parseInt(req.param('page') || 1);
    let pageSize = parseInt(req.param('pageSize') || 10);
    let sort = req.param('sort') || 1;
    let skip = (page - 1) * pageSize;
    let params = {};
    console.log(skip);
    console.log(pageSize);
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice': sort});
    goodsModel.exec(function(err, doc) {
        if(err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
    /* console.log('访问到根')
    Goods.find({}, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    }) */
});

module.exports = router;