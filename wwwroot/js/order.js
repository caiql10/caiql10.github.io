$(function() {
    $.ajax({
        type: 'get',
        url: '/getBuyGoods',

    }).done((res) => {
        console.log(res);
        let winHeight = $(window).height();
        $('.harvest-info .infosPage').css({
            top: winHeight
        })
        $('.harvest-info .con>.center').on('click', function() {
            $('.harvest-info .infosPage').animate({
                top: '0.45rem'
            }, 500)
            $('.infosPage').find('.btn').on('click', function(e) {
                let inputs = $('.harvest-info input');
                let arrValue = [];
                let arrPlace = [];
                let regName = /^[a-zA-Z\u4e00-\u9fa5]+$/ig;
                let regphone = /^1[3-9]\d{9}$/g;
                let regAtr = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g;
                let regArr = [regName, regphone, regAtr];
                inputs.each(function(i, item) {

                    let place = $(item).attr('placeholder');
                    place = place.substring(3);
                    arrPlace.push(place);
                    arrValue.push(item.value);

                })
                let sure = 0;
                for (let i = 0; i < arrValue.length; i++) {
                    if (!regArr[i].test(arrValue[i]) || arrValue[i] == '') {
                        let str = '';
                        str = `
                        <div class="maskBg">
                        <div class="maskCenter">
                            <p>请正确输入${arrPlace[i]}</p>
                            <div class="btns">
                                <span>确认</span>
                            </div>
                        </div>
                        </div>
                        
                        `;
                        $('.infosPage').append(str);
                        break;
                    } else {
                        sure++;
                    }
                }
                if (sure === 3) {
                    $('.harvest-info .infosPage svg').triggerHandler('click');
                    let peoInfo = '';
                    peoInfo += `
                    <div class="my-info">
                        <div class="top">
                    
                        <span>收货人：${inputs[0].value}</span>
                        <span>${inputs[1].value}</span>
                        </div>
                        <div class="bottom">
                        ${inputs[2].value}
                        </div>
                    </div>
                    
                    `;
                    $('.harvest-info .con>.center').remove();
                    $('.harvest-info .con').append(peoInfo);
                }
                $('.maskBg .btns').on('click', function() {
                    $('.maskBg').remove();
                })

            })
            $('.harvest-info .infosPage svg').on('click', function() {
                $('.harvest-info .infosPage').animate({
                    top: winHeight
                }, 500);
            });

        })

        // 渲染商品
        let goodsStr = "";
        if ((typeof res[0]) != 'string') {
            res.forEach(element => {
                goodsStr += `
            <div class="goods">
                    <img src=${element.img} alt="">
                    <div class="infos">
                        <p class="title">${element.title}</p>
                        <p class="other">${element.info}</p>
                    </div>
                    <div class="price">
                        <p class="pri"><span>￥</span><span>${Number(element.price).toFixed(2)}</span></p>
                        <p class="num"><span>×</span><span>${element.number}</span></p>
                    </div>
                </div>
            `;
            });
        } else {
            goodsStr = `
            <div class="noOrder">暂无订单</div>
            `;
        }

        $('.douban-goods .contents').html(goodsStr);
        let workDetailStr = '';
        let tipsStr = '';
        let payStr = '';
        let settlementStr = '';
        if ($('.douban-goods .contents .goods').length) {
            workDetailStr = '';
            tipsStr = '';
            payStr = '';
            settlementStr = '';
            workDetailStr = `
            <div class="work-detail">
                <div class="list1">
                <span>商品总额</span>
                <span>￥${workSum()}</span>
                </div>
                <div class="list2">
                <span>优惠券</span>
                <span>暂无可用优惠券</span>
                </div>
                <div class="list3">
                <span>运费</span>
                <span>￥0.00</span>
                </div>
            </div>
            `;
            tipsStr = `请在下单后30分钟之内完成付款，否则订单将被取消`;
            payStr = `
            <h2>选择支付方式</h2>
            <div class="wechat">
                <div class="left">
                    <img src="./img/wechart.png" alt="">
                    <span>使用微信支付</span>
                </div>
                <div class="input">
                    <input type="radio" name="pay" id="pay1" checked>
                    <label for="pay1"></label>
                </div>

            </div>
            <div class="ali">
                <div class="left">
                    <img src="./img/alipay.png" alt="">
                    <span>使用支付宝支付</span>
                </div>
                <div class="input">
                    <input type="radio" name="pay" id="pay2">
                    <label for="pay2"></label>
                </div>
            </div>
            `;
            settlementStr = `
            <div class="footer-wrap">
            <span>应付：</span>
            <span class="price">￥${workSum()}</span>
            <span class="btn">提交订单</span>
        </div>
            `;
        }
        $('.douban-works').html(workDetailStr);
        $('.tips').html(tipsStr);
        $('.pays').html(payStr);
        $('footer').html(settlementStr);

        // 提交订单
        let payPageInfoStr = '';
        let radipCh = $('input[type="radio"]:checked');
        $('footer .btn').on('click', function() {
            if ($('.my-info').length && radipCh.length) {
                payPageInfoStr = `
                <div class="payPage">
                <h1>
                <svg t="1672295952317" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6786" width="32" height="32"><path d="M801.856 734.016 579.904 512l222.016-222.016c18.816-18.816 18.88-49.152 0.064-67.968-18.752-18.752-49.216-18.752-67.904 0L512 444.032 289.92 222.016c-18.688-18.752-49.088-18.752-67.904 0C203.328 240.768 203.328 271.232 222.144 290.048L444.096 512l-222.016 221.952c-18.816 18.752-18.816 49.152-0.064 67.968C231.424 811.392 243.84 816 256 816s24.576-4.608 33.92-14.016L512 579.968l222.08 222.016c9.408 9.344 21.696 14.016 33.92 14.016 12.288 0 24.576-4.608 33.92-14.016C820.672 783.104 820.736 752.768 801.856 734.016z" p-id="6787"></path></svg>
                <span>支付</span>
                </h1>
                <h2 class="price">￥${workSum()}</h2>
                <div class="tool">
                    <span>收款方</span>
                    <span>豆瓣豆品</span>
                </div>
                <div class="paybtn">立即支付</div>
            </div>
                `;
                $('main').append(payPageInfoStr);
                $('main>.payPage').css({
                    top: 0
                })
                $('main>.payPage svg').on('click', function() {
                    $('.payPage').remove();
                })
            } else {
                $('main').append(`
                <p class="err">请选择信息地址</p>
                `);
                $('.err').css({
                    width: '2rem',
                    'text-align': 'center',
                    // height: '0.35rem',
                    'line-height': '0.35rem',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '1rem',
                    'text-align': 'center',
                    color: 'rgba(244, 9, 9, 0.57)',
                    'font-size': '0.2rem',
                    padding: '0.03rem 0.08rem',
                    'box-shadow': '0 0 0.1rem rgba(222, 125, 125, 0.5)'
                }).fadeOut(1500);
                $('.err:hidden').remove();
            }

        });

        // 计算商品总额
        function workSum() {
            let goodsList = $('.douban-goods .contents .goods');
            let all = 0;
            goodsList.each(function(i, item) {
                let value = Number($(item).find('.pri span:eq(1)').text());
                let num = Number($(item).find('.num span:eq(1)').text());
                all += value * num;
                console.log(value, num);
            })
            return all.toFixed(2);
        }
    }).fail(err => {
        console.log(err);
    })
})