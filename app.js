const express = require('express');
// 自定义电影数据
const movieapi = require('./movieapi.js');
const goodsapi = require('./shopapi.js');
const app = express();
const Mock = require('mockjs');
const Random = Mock.Random;
app.use(express.static('wwwroot'));
app.use(express.urlencoded({ extended: true }));
// -----------------------start

// 电影get请求
app.get('/allMovie', (req, res) => {
    res.send(movieapi);
})
let singleMovie = null;
app.post('/selectMovie', (req, res) => {
    movieapi.forEach((ele) => {
        if (Number(req.body.id) === ele.id) {
            singleMovie = ele;
            res.send(singleMovie);
            return;
        }
    })

});
// 商品页面post请求
let singleGoods = null;
app.post('/selectGoods', (req, res) => {
    goodsapi.forEach((ele) => {
        if (Number(req.body.goodId) === ele.goodId) {
            singleGoods = ele;
            res.send(singleGoods);
            return;
        }
    })

});
// goodsapi[1].number = 9;
console.log(goodsapi[1].number);
// 商品get请求
app.get('/allgoods', function(req, res) {
    res.send(goodsapi);
});

// 确定加入购物车的选项
app.post('/shoppingCast', function(req, res) {
    console.log(req.body)
    goodsapi.forEach(ele => {
        if (req.body.goodId == ele.goodId) {
            ele.isB = true;
            ele.number = req.body.allgoods;
            ele.selIndex = req.body.selIndex;
        }
    })
    res.send(goodsapi);
});
// 删除
app.post('/shoppingCastRemove', function(req, res) {
    console.log(req.body)
    goodsapi.forEach(ele => {
        if (req.body.goodId == ele.goodId) {
            ele.isB = false;
        }
    })
    res.send(goodsapi);
});
// 支付
let arrB = [];
app.post('/shoppingCastPay', function(req, res) {
    console.log(req.body);
    arrB.splice(0);
    goodsapi.forEach(ele => {
        req.body.arr1.forEach((item) => {
            if (item.goodId == ele.goodId) {
                ele.number = item.allgoods
                arrB.push({
                    img: ele.firstImg,
                    title: ele.title,
                    info: ele.buy[ele.selIndex].name,
                    price: ele.buy[ele.selIndex].price,
                    number: ele.number
                })
            }
        })

    })
    res.send(arrB);
});
console.log(arrB);
app.get('/getBuyGoods', (req, res) => {
    console.log(arrB);
    let arr = [];
    if (arrB.length !== 0) {
        arr = arrB;
    } else {
        arr.push('暂无数据');
    }
    res.send(arr);
});
// mock模拟数据
let itemNums=Random.integer(6, 12);
let pcArr = [];
app.get('/pcgalleryMore',(req,res)=>{
    let Arr=[];
    for (let i = 0; i < 3; i++) {
        const a = '#' + Random.integer(180, 255).toString(16) +
            Random.integer(140, 255).toString(16) +
            Random.integer(120, 220).toString(16);
        let data = Mock.mock({
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id': '@id',
            'name': '@cname()',
            'title': '@ctitle(10, 20)',
            'page': '@cparagraph()',
            'rephone': '@integer(60, 100)',
            'good': '@integer(100, 1000)',
            'transmit': '@integer(50, 100)',
            // Random.image( size, background, foreground, format, text )
            'touxiang': Random.image('50x50', a, Random.cword(1)),
            'imgs|1-3': [Random.image('200x200')],
        })
        Arr.push(data);
    }
    if (Arr.length) {
        Arr.forEach(item => {
            item.imgs.forEach((ele, i) => {
                const b = '#' + Random.integer(180, 255).toString(16) +
                    Random.integer(140, 255).toString(16) +
                    Random.integer(120, 220).toString(16);
                item.imgs[i] = Random.image('200x200', b, '#000', Random.cword(3));
            })
        })
    }
    
    res.send(Arr);
})


// console.log(pcArr)
app.get('/pcData', (req, res) => {
    pcArr=[];
    for (let i = 0; i < itemNums; i++) {
        const a = '#' + Random.integer(180, 255).toString(16) +
            Random.integer(140, 255).toString(16) +
            Random.integer(120, 220).toString(16);
        let data = Mock.mock({
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id': '@id',
            'name': '@cname()',
            'title': '@ctitle(10, 20)',
            'page': '@cparagraph()',
            'rephone': '@integer(60, 100)',
            'good': '@integer(100, 1000)',
            'transmit': '@integer(50, 100)',
            // Random.image( size, background, foreground, format, text )
            'touxiang': Random.image('50x50', a, Random.cword(1)),
            'imgs|1-3': [Random.image('200x200')],
        })
        pcArr.push(data);
    }
    if (pcArr.length) {
        pcArr.forEach(item => {
            item.imgs.forEach((ele, i) => {
                const b = '#' + Random.integer(180, 255).toString(16) +
                    Random.integer(140, 255).toString(16) +
                    Random.integer(120, 220).toString(16);
                item.imgs[i] = Random.image('200x200', b, '#000', Random.cword(3));
            })
        })
    }
        res.send(pcArr);
    })
    // -----------------------end
    // 启动服务
app.listen(80, function() {
    console.log('running...');
})