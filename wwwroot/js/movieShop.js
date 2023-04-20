// 列表显示隐藏
$('header .list-box .list-img').on('click', function(e) {
    $(this).parent('.list-box').children('.my-box').animate({
        left: 0
    }, 500)
    $('#list-cancle').on('click', function() {
        $(this).parents('.my-box').animate({
            left: '-2.24rem'
        })
    })
});
// 轮播
var myswiper1 = new Swiper('.swiper1', {
    autoplay: true, //可选选项，自动滑动
    pagination: {
        el: '.swiper-pagination1',
    },
    touchRatio: 0.5, //触摸变慢
});
// 渲染每日团购部分
let groupPurchaseStr = "";
groupPurchaseStr += `
 <div class="title">
                    <span>豆小铺团购</span>
                    <div class="right">
                        <span>${currentWeek()}</span>
                        <span>></span>
                    </div>

                </div>
                <div class="swiper swiper2">
                    <div class="swiper-wrapper">
`;
purch.forEach(function(ele, i) {
    groupPurchaseStr += `
   
                        <div class="swiper-slide">
                            <img src=${ele.img} alt="">
                            <div class="users">
                            <div class="imgbox">
                                <div class="imgs"></div>
                                </div>
                                <span>${random(100,200)}参团</span>
                            </div>
                            <div class="infos">
                                <p class="time">限时抢购.${ele.endtime}结束</p>
                                <p class="title">${ele.title}</p>
                                <p class="other">${ele.page}</p>
                            </div>
                        </div>
                    
    `;
})
groupPurchaseStr += `</div>
</div>`;
$('.groupPurchase .purchase').html(groupPurchaseStr);
let myswiper2 = new Swiper('.swiper2', {
    autoplay: true, //可选选项，自动滑动
    touchRatio: 0.5, //触摸变慢
    effect: 'cards',
    cardsEffect: {
        slideShadows: true,
        //transformEl:'.text',
    },
})
copyEle($('.swiper2 .imgs'), '<img src="./img/user_normal.png"/>', random(70, 90));
// let imgsWidth = $('.swiper2 .imgs').width();
// $('.swiper2 .imgs').animate({
//     left: `${imgsWidth}px`
// }, 10000, function() {
//     $('.swiper2 .imgs').css({
//         left: '0'
//     })
// })
$('.swiper2 .imgbox').marquee({
    auto: true,
    interval: 2000,
    // speed: 800,
    // showNum: 6,
    // stepLen: 6,
    direction: 'backward'
});

// 豆瓣豆品轮播
var myswiper3 = new Swiper('.swiper3', {
    autoplay: true, //可选选项，自动滑动
    pagination: {
        el: '.swiper-pagination3',
    },
    touchRatio: 0.5, //触摸变慢
});
// 豆瓣豆品向上滚走马灯
// let uptimer = setInterval(function() {
//     let pstr = '<p class="animate__animated"><img src="./img/mtalk-h.jpg" alt=""><span>已下单豆瓣电影日历</span></p>'
//     let p = $('.douban-doupin .douban-allbuy p').eq(0);
//     p.addClass('animate__fadeOutUp');
//     setTimeout(function() {
//         p.remove();
//     }, 600)



//     $('.douban-allbuy .users').append(pstr);


// }, 1000)
$('.douban-doupin .douban-allbuy .users').marquee({
    auto: true,
    duration: '800',
    direction: 'up'
});

// 全部好物
$.ajax({
    type: 'get',
    url: '/allgoods',

}).done(function(res) {
    let allClassStr = '';
    let foodsStr = "";
    let woorStr = "";
    res.forEach(function(item) {
        allClassStr += `
        <a href="./goodsDetail.html?id=${item.goodId}" class="box">
                        <img src=${item.firstImg} alt="">
                        <div class="info">
                            <p class="tit"><span>豆品</span>${item.title}</p>
                            <p class="peo"><span>${item.gift}</span><span>${random(10,100)}万人在逛</span></p>
                            <div class="price">
                                <div class="left">
                                    <span class="newp"><span>￥</span>${item.newprice}</span>
                                    <span class="danwei">/个</span>
                                    <span class="oldp">￥${item.oldprice}</span>
                                </div>
                                <img src="./img/shopping.png" alt="">

                            </div>
                        </div>
                    </a>
        `
        if (item.class == '零食') {
            foodsStr += `
        <a href="./goodsDetail.html?id=${item.goodId}" class="box">
                        <img src=${item.firstImg} alt="">
                        <div class="info">
                            <p class="tit"><span>豆品</span>${item.title}</p>
                            <p class="peo"><span>${item.gift}</span><span>${random(10,100)}万人在逛</span></p>
                            <div class="price">
                                <div class="left">
                                    <span class="newp"><span>￥</span>${item.newprice}</span>
                                    <span class="danwei">/个</span>
                                    <span class="oldp">￥${item.oldprice}</span>
                                </div>
                                <img src="./img/shopping.png" alt="">

                            </div>
                        </div>
                    </a>
        `
        }
        if (item.class == '酒馆') {
            woorStr += `
        <a href="./goodsDetail.html?id=${item.goodId}" class="box">
                        <img src=${item.firstImg} alt="">
                        <div class="info">
                            <p class="tit"><span>豆品</span>${item.title}</p>
                            <p class="peo"><span>${item.gift}</span><span>${random(10,100)}万人在逛</span></p>
                            <div class="price">
                                <div class="left">
                                    <span class="newp"><span>￥</span>${item.newprice}</span>
                                    <span class="danwei">/个</span>
                                    <span class="oldp">￥${item.oldprice}</span>
                                </div>
                                <img src="./img/shopping.png" alt="">

                            </div>
                        </div>
                    </a>
        `
        }
    });

    $('.douban-allgoods .conclass-all').html(allClassStr);
    $('.douban-allgoods .foodsClass').html(foodsStr);
    $('.douban-allgoods .woorClass').html(woorStr);
    $('.douban-allgoods .none').html(`
            <div class="text">
                去其他分类看看吧~~
            </div>`);
    $('.douban-allgoods .goodsClass li').each(function(i, ele) {
        $(this).on('click', function() {
            $(this).addClass('add').siblings('li').removeClass('add');
            $('.douban-allgoods .content').eq(i).css({
                display: 'flex'
            }).siblings('.content').css('display', 'none');
        })

    })
}).fail(function(err) {
    console.log('请求错误', err);
})

// 头部滚动固定
$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $('header').css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            'z-index': 9
        })
    } else {
        $('header').css({
            position: ''
        })

    }
})

function upslide() {
    $('.douban-doupin .douban-allbuy p').each(function(i) {
        console.log($(this))

        $(this).addClass('animate__fadeOutUp');

    })
}





function currentWeek() {
    let week = new Date().getDay();
    let str = '';
    switch (week) {
        case 0:
            str = "周日";
            break;
        case 1:
            str = "周一";
            break;
        case 2:
            str = "周二";
            break;
        case 3:
            str = "周三";
            break;
        case 4:
            str = "周四";
            break;
        case 5:
            str = "周五";
            break;
        case 6:
            str = "周六";
            break;
    }

    return str;
}
// box放入的盒子，ele要加载的字符串，n加载次数
function copyEle(box, ele, n) {
    box.html(ele.repeat(n));
}
// 生成num1-num2的随机数
function random(num1, num2) {
    let n = Math.random() * (num2 - num1 + 1) + num1;
    return parseInt(n);
}