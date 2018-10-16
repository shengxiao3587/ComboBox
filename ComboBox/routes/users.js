var express = require('express');
var router = express.Router();


/* GET users listing. */

var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

var data = [
    {
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
},{
    id: '12345',
    name: 'n1'
}, {
    id: '123456',
    name: 'n2'
},{
    id: '1234567',
    name: 'n1'
}, {
    id: '123',
    name: 'n2'
},{
    id: '12',
    name: 'n1'
}, {
    id: '1',
    name: 'n2'
}];


router.post('/', function(req, res, next) {
    setTimeout(function() {
        next();
    }, Math.random() * 5000);
});

router.post('/', function(req, res, next) {
    var name = req.body.name;
    var page = req.body.page;
    var count;  // 实际返回给前端的数据条数
    var allRet; // 筛选出的所有数据
    var ret = [];  // 根据页码返回给前端的数据
    allRet = data.filter(function(item) {
        return item.id.indexOf(name) > -1;
    });

    if ((page + 1) * 10 <= allRet.length){
        count = 10;
    }else if((page + 1) * 10 > allRet.length){ // 剩余不足10条数据
        count = allRet.length - (page * 10);
    }

    for(var i = 0;i < count;i += 1){
        ret[i] = allRet[page * 10 + i];
    }
    var allPage = parseInt(allRet.length/10);
    var mapData = ret.map(function(item) {
        item.allPage = allPage;
        return item;
    });
    return res.json(mapData);
});

module.exports = router;
