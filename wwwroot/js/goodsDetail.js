let urlPath = location.href;
console.log(urlPath);
let idStr = urlPath.split('?')[1].split('=')[1].split('#')[0];

$.ajax({
        type: 'post',
        url: '/selectGoods',
        data: { goodId: idStr },
    }).done(function(res) {
        console.log(res);
        // 头部标题
        $('header h1').html(`${res.title}`);
        // 渲染轮播区域
        let goodsLunboStr = "";
        goodsLunboStr += `<div class="swiper">
                <div class="swiper-wrapper">`;
        res.slideImgs.forEach(element => {
            goodsLunboStr += `
            
                    <div class="swiper-slide">
                        <img src=${element} alt="">
                    </div>
                
            `;
        });
        goodsLunboStr += `</div>
                <div class="swiper-pagination"></div>
            </div>`;
        $('.goods-lunbo').html(goodsLunboStr);
        var mySwiper = new Swiper('.swiper', {
                autoplay: true, //可选选项，自动滑动
                pagination: {
                    el: '.swiper-pagination',
                    // type: 'bullets',
                    type: 'fraction',

                },
                touchRatio: 0.5, //触摸变慢
            })
            // 商品基本详情
        let goodsBascStr = "";
        goodsBascStr += `
    <h1>${res.title}</h1>
    <div class="price">
        <div class="minprice">
            <span>￥</span>
            <span class="pri">${res.minprice}</span>
            <span>/个</span>
        </div>
        <div class="maxprice">
            <span>￥</span>
            <span class="pri">${res.maxprice}</span>
            <span>/套</span>
        </div>
    </div>
    <div class="gift">
        <p><span class="tag">限时特惠</span><span>12.23-1.5立减10元</span></p>
        <p><span class="tag">${res.gift}</span><span>${res.giftthing}</span></p>
    </div>
    `;
        $('.goods-bascInfo').html(goodsBascStr);

        // 底部详情信息
        let goodsDescStr = "";
        res.infoImgs.forEach((ele) => {
            goodsDescStr += `
        <img src=${ele} alt="">
        `;
        })
        $('.goods-desc').html(goodsDescStr);
        // 底部参数信息
        let goodsParaStr = "";
        res.canshu.forEach((ele) => {
            goodsParaStr += `
        <img src=${ele} alt="">
        `;
        })
        $('.goods-parameter').html(goodsParaStr);
        // 底部测评信息
        let goodsDeterStr = "";
        goodsDeterStr += `
        <img src=${res.ceping} alt="">
        `;

        $('.goods-determine').html(goodsDeterStr);

        // 滚动
        let bannerTop = $('.goods-banner').offset().top;
        $(window).scroll(function() {
            // console.log(bannerTop);
            let scrollH = $(window).scrollTop();
            if (scrollH > bannerTop) {
                $('header').css({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    "z-index": 2,
                    "background-color": '#fff'
                });
                $('.goods-banner').css({
                    position: 'fixed',
                    top: '0.45rem',
                    left: 0,
                    right: 0,
                    "z-index": 2,
                    "background-color": '#fff'
                })
            } else {
                $('header').css({
                    position: '',

                });
                $('.goods-banner').css({
                    position: '',

                })
            }
        });

        // 加入购物车
        let shoppingCastStr = "";
        shoppingCastStr += `
    <div class="top-box">
    <div class="left">
        <img src=${res.firstImg} alt="">
    </div>
    <div class="right">
        <div class="title">
            <span>${res.title}</span>
            <svg t="1672295952317" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6786" width="32" height="32"><path d="M801.856 734.016 579.904 512l222.016-222.016c18.816-18.816 18.88-49.152 0.064-67.968-18.752-18.752-49.216-18.752-67.904 0L512 444.032 289.92 222.016c-18.688-18.752-49.088-18.752-67.904 0C203.328 240.768 203.328 271.232 222.144 290.048L444.096 512l-222.016 221.952c-18.816 18.752-18.816 49.152-0.064 67.968C231.424 811.392 243.84 816 256 816s24.576-4.608 33.92-14.016L512 579.968l222.08 222.016c9.408 9.344 21.696 14.016 33.92 14.016 12.288 0 24.576-4.608 33.92-14.016C820.672 783.104 820.736 752.768 801.856 734.016z" p-id="6787"></path></svg>
        </div>
        <div class="price"><span>￥</span><span class="goodsPri">${res.newprice.toFixed(2)}</span></div>
        <div class="select">请选择<span></span></div>
    </div>
</div>
<div class="selection-box">
                <div class="styles">
                    <h2>款式:</h2>
                    <ul class="selects">
                        
                    </ul>
                </div>
                <div class="nums">
                    <span>数量:</span>
                    <div class="box">
                        <span class="dec">-</span>
                        <span class="value">1</span>
                        <span class="plus">+</span>
                    </div>
                </div>
            </div>
            <div class="btns">
            <div class="addCasts">
                加入购物车
            </div>
            <div class="sureBuy">
                立即购买
            </div>
        </div>
    `;
        $('.addToShopcast').html(shoppingCastStr);
        let selectsStr = ""
        res.buy.forEach((ele) => {
            selectsStr += `
        <li data-price=${ele.price}>${ele.name}</li>
        `
        });
        $('.addToShopcast .selection-box .selects').html(selectsStr);
        $('#addCast').on('click', function() {
            $('.addToShopcast').css({
                display: 'block'
            })
            $('.addToShopcast .btns .addCasts').css({
                display: 'block'
            }).siblings().css({
                display: 'none'
            })
            $('main').css({
                display: 'none'
            })
        });
        $('#startBuy').on('click', function() {
            $('.addToShopcast').css({
                display: 'block'
            })
            $('.addToShopcast .btns .sureBuy').css({
                display: 'block'
            }).siblings().css({
                display: 'none'
            })
            $('main').css({
                display: 'none'
            })
        });
        // 点击取消页面
        $('.addToShopcast .top-box svg').on('click', function() {
                $('.addToShopcast').css({
                    display: 'none'
                })
                $('main').css({
                    display: 'block'
                })
            })
            // 点击li选择
        let isSelectF = { isS: false, value: 0, index: 0 };
        $('.addToShopcast .selection-box .selects li').each(function(i, ele) {
                $(this).click(function() {
                    if (!$(this).hasClass('add')) {
                        isSelectF.isS = true;
                        isSelectF.value = Number($(this).attr('data-price'));
                        isSelectF.index = i;

                        $('.addToShopcast .selection-box .plus').css({
                            color: '#000'
                        })

                        $(this).addClass('add').siblings('li').removeClass('add');
                        $('.addToShopcast .goodsPri').text(Number($(this).attr('data-price')).toFixed(2));
                        $('.addToShopcast .top-box .select').html(`已选择<span>"${res.buy[i].name}"</span>`);
                    } else {
                        isSelectF.isS = false;
                        $('.addToShopcast .selection-box .dec').css({
                            color: '#939191'
                        })
                        $('.addToShopcast .selection-box .plus').css({
                            color: '#939191'
                        })
                        $(this).removeClass('add');
                        $('.addToShopcast .goodsPri').text(res.newprice.toFixed(2));
                        $('.addToShopcast .top-box .select').html(`请选择<span></span>`);
                    }

                })

            })
            // 点击+-
            // console.log(isSelect($('.addToShopcast .selection-box .selects li'), 'add'))

        let dec = $('.addToShopcast .selection-box .dec');
        let plus = $('.addToShopcast .selection-box .plus');
        dec.on('click', function() {
            let num = $('.addToShopcast .selection-box .value');
            let numV = Number($('.addToShopcast .selection-box .value').text());
            if (isSelectF.isS) {

                let value;
                let sv = isSelectF.value;

                if (numV <= 1) {
                    numV = 1;
                    dec.css({
                        color: '#939191'
                    });
                } else {
                    numV--;
                    dec.css({
                        color: '#000'
                    });
                }
                if (numV == 1) {
                    dec.css({
                        color: '#939191'
                    });
                }
                value = sv * numV;
                console.log(sv)
                $('.addToShopcast .goodsPri').text(value.toFixed(2));
                num.text(numV);
            } else {
                dec.css({
                    color: '#939191'
                });
                plus.css({
                    color: '#939191'
                })
            }
        })
        plus.on('click', function() {
            let num = $('.addToShopcast .selection-box .value');
            let numV = Number($('.addToShopcast .selection-box .value').text());
            if (isSelectF.isS) {

                let value;
                let sv = isSelectF.value;
                numV++;
                value = sv * numV;
                if (numV > 1) {
                    dec.css({
                        color: '#000'
                    });
                }
                console.log(sv)
                $('.addToShopcast .goodsPri').text(value.toFixed(2));
                num.text(numV);
            }
        });

        // 点击立即购买跳出弹窗
        $('.addToShopcast .btns .sureBuy').on('click', function() {
                if (isSelectF.isS) {
                    let tanchuan = `<div class="mask-bg">
                <div class="center-box">
                    <h2>
                    <span>请支付</span>
                    <svg t="1672295952317" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6786" width="32" height="32"><path d="M801.856 734.016 579.904 512l222.016-222.016c18.816-18.816 18.88-49.152 0.064-67.968-18.752-18.752-49.216-18.752-67.904 0L512 444.032 289.92 222.016c-18.688-18.752-49.088-18.752-67.904 0C203.328 240.768 203.328 271.232 222.144 290.048L444.096 512l-222.016 221.952c-18.816 18.752-18.816 49.152-0.064 67.968C231.424 811.392 243.84 816 256 816s24.576-4.608 33.92-14.016L512 579.968l222.08 222.016c9.408 9.344 21.696 14.016 33.92 14.016 12.288 0 24.576-4.608 33.92-14.016C820.672 783.104 820.736 752.768 801.856 734.016z" p-id="6787"></path></svg>
                    </h2>
                    <div class="time"></div>
                    <img src="../img/payImg.png">
                </div>
            </div>`;
                    $('.addToShopcast').append(tanchuan);
                    let timer;
                    countDown(10, timer, $('.addToShopcast .mask-bg .time'))
                    $('.addToShopcast .mask-bg svg').on('click', function() {
                        clearInterval(timer);
                        $('.addToShopcast .mask-bg').remove();
                    })
                } else {
                    $('.addToShopcast').append(`
                <p class="showStyle">请选择款式！</p>
                `);
                    $('.showStyle').css({
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '1rem',
                        'text-align': 'center',
                        color: 'rgba(0,0,0,0.5)',
                        'font-size': '0.2rem',
                    }).fadeOut(1500);
                    $('.showStyle:hidden').remove();
                }
            })
            // 点击加入购物车post请求
        $('.addToShopcast .btns .addCasts').on({
            mousedown: function() {
                $(this).css({
                    'background-color': 'red',

                })
            },
            mouseup: function() {
                $(this).css({
                    'background-color': '#373737',

                })
            }
        })
        $('.addToShopcast .btns .addCasts').on('click', function() {
            if (isSelectF.isS) {
                $.ajax({
                    type: 'post',
                    url: '/shoppingCast',
                    data: {
                        isB: true,
                        goodId: res.goodId,
                        selIndex: isSelectF.index,
                        allgoods: Number($('.addToShopcast .selection-box .value').text())
                    }
                }).done(function(res) {
                    console.log(res);
                    // $('.addToShopcast .top-box svg').triggerHandler('click');
                    $('.addToShopcast').append(`
                <p class="addSuc">添加成功！</p>
                `);
                    $('.addSuc').css({
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '1rem',
                        'text-align': 'center',
                        color: 'rgba(244, 9, 9, 0.57)',
                        'font-size': '0.2rem',
                    }).fadeOut(1000);
                    $('.addSuc:hidden').remove();
                    setTimeout(function() {
                        $('.addToShopcast .top-box svg').triggerHandler('click');
                    }, 1000);

                }).fail(function(err) {
                    console.log('post发生错误', err);
                })
            } else {
                $('.addToShopcast').append(`
                <p class="showStyle">请选择款式！</p>
                `);
                $('.showStyle').css({
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '1rem',
                    'text-align': 'center',
                    color: 'rgba(0,0,0,0.5)',
                    'font-size': '0.2rem',
                }).fadeOut(1500);
                $('.showStyle:hidden').remove();
            }
        })

    }).fail(function(err) {
        console.log('请求错误', err);
    })
    // 倒计时
    // allTime：分钟数，timer:计时器变量，ele渲染元素
function countDown(allTime, timer, ele) {
    let allSecs = allTime * 60;
    let min, sec;
    clearInterval(timer);
    timer = setInterval(function() {

        // if (sec == 0) {
        //     min--;
        //     if (min == 0) {
        //         clearInterval(timer);
        //         ele.html(`请重新选择`);
        //         return;
        //     }
        // }
        if (allSecs <= 0) {
            clearInterval(timer);
            ele.html(`请重新选择`);
            return;
        }
        sec = parseInt(allSecs % 60);
        min = parseInt(allSecs / 60);
        allSecs--;
        sec < 10 ? sec = '0' + sec : sec = sec;
        min < 10 ? min = '0' + min : min = min;
        ele.html(`剩余支付时间:${min}:${sec}`);

    }, 1000)
}