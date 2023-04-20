$(function() {
    $.ajax({
        type: 'get',
        url: '/allgoods',
    }).done(function(res) {
        // 购物车内容渲染
        console.log(res);
        let castContentStr = "";
        res.forEach(element => {
            let selindex = Number(element.selIndex);
            if (element.isB) {
                castContentStr += `
                <div class="goodsbox" data-id="${element.goodId}">
                <div class="left">
                <input type="checkbox" name="" id="check${element.goodId}">
                <label for="check${element.goodId}"></label>
                    <img src=${element.firstImg} alt="">
                </div>
                <div class="right">
                    <p class="tit" >${element.title}</p>
                    <p class="info">${element.buy[selindex].name}</p>
                    <div class="bar">
                        <span class="price">￥${element.buy[selindex].price}</span>
                        <div class="numbox">
                            <span class="dec">-</span>
                            <span class="val">${element.number}</span>
                            <span class="plus">+</span>
                        </div>
                    </div>
                </div>
                <div class="remove">
                    删除
                </div>
            </div>
                `;
            }
        });
        $('.all-goods').html(castContentStr);
        if (!$('.all-goods').html()) {
            let spaceStr = "";
            spaceStr += `
        <div class="space">
            <img src="./img/nocontent.jpg">
            <a href="./movieShop.html">去逛逛</a>
        </div>
        `;
            $('.all-goods').html(spaceStr);
        }

        // 初始状态
        $('input').prop('checked', false);
        inputGred();
        if ($('.all-goods').html()) {
            isSmallOne($('.goodsbox'));
        }


        // 全选
        $('.footer-wrap input').on('click', function() {
            let isCheck = this.checked;
            console.log(isCheck, this.checked)
            if (isCheck) {

                $('.all-goods input[type="checkbox"]').prop('checked', true);
                inputRed();
                $('footer .totPrice').text(`￥ ${totalPrice()}`);
                if (selNum() == 0) {
                    inputGred();
                    $('footer .totPrice').text(`￥ ${totalPrice()}`)
                }
            } else {

                $('.all-goods input[type="checkbox"]').prop('checked', false);
                inputGred();
                $('footer .totPrice').text(`￥ ${totalPrice()}`)
            }
        });
        $('.all-goods input[type="checkbox"]').on('click', function() {
            isSel();
            inputRed();
            if (selNum() == 0) {
                inputGred();
            }
            $('footer .totPrice').text(`￥ ${totalPrice()}`)
        })
        console.log(totalPrice());
        // 加减

        $('.goodsbox .plus').on('click', function(e) {
            let plusStr = Number($(this).siblings('.val').text());
            plusStr++;
            $(this).siblings('.val').text(plusStr);
            isSmallOne($(this).parents('.goodsbox'));
            if ($(this).parents('.goodsbox').find('input')[0].checked) {
                $('footer .totPrice').text(`￥ ${totalPrice()}`)
            }
        })
        $('.goodsbox .dec').on('click', function() {
                let decStr = Number($(this).siblings('.val').text());
                if (decStr <= 1) {
                    decStr = 1;
                } else {
                    decStr--;
                }
                $(this).siblings('.val').text(decStr);
                isSmallOne($(this).parents('.goodsbox'));
                if ($(this).parents('.goodsbox').find('input')[0].checked) {
                    $('footer .totPrice').text(`￥ ${totalPrice()}`)
                }
            })
            // 取消
        $('.goodsbox .remove').on('click', function() {
                let box = $(this).parents('.goodsbox');
                let goodId = $(this).parents('.goodsbox').attr('data-id');
                let all = $(this).parents('.goodsbox').find('.val').text();
                $.ajax({
                    type: 'post',
                    url: '/shoppingCastRemove',
                    data: { goodId: goodId, isB: false }
                }).done(function(res) {
                    box.remove();
                    console.log($('.all-goods').html())

                    if ($('.all-goods').html() == false) {
                        let spaceStr = "";
                        spaceStr += `
        <div class="space">
            <img src="./img/nocontent.jpg">
            <a href="./movieShop.html">去逛逛</a>
        </div>
        `;
                        $('.all-goods').html(spaceStr);
                    }


                    totalPrice();
                    isSel();
                    if (selNum() > 0) {
                        inputRed();
                        $('footer .totPrice').text(`￥ ${totalPrice()}`)
                    } else {
                        inputGred();
                        $('footer .totPrice').text(`￥ ${totalPrice()}`)
                    }
                })
            })
            // 结算
        $('footer .closing').on('click', function(e) {
            e.preventDefault();
            let arr1 = [];
            if (selNum() > 0) {
                $('.all-goods input[type="checkbox"]').each(function(i, item) {
                    if (item.checked) {
                        let id = $(this).parents('.goodsbox').attr('data-id');
                        let num = $(this).parents('.goodsbox').find('.val').text();
                        arr1.push({ goodId: id, allgoods: num })
                    }
                })
                console.log(arr1);

                $.ajax({
                    type: 'post',
                    url: '/shoppingCastPay',
                    cache: false,
                    data: { arr1 }
                }).done(function(res) {
                    console.log(res);
                    location.assign('../order.html');
                }).fail(function(err) {
                    console.log(err);
                })
            } else {
                $('.all-goods').append(`
                <p class="err">请选择</p>
                `);
                $('.err').css({
                    width: '0.8rem',
                    height: '0.35rem',
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
        })

        function isSel() {
            let num = 0;
            let all = $('.all-goods input[type="checkbox"]').length;
            $('.all-goods input[type="checkbox"]').each(function(i, item) {
                if (item.checked) {
                    num++;
                }
            })
            if (num === all) {
                $('.footer-wrap input').prop('checked', true);
            } else {
                $('.footer-wrap input').prop('checked', false);
            }

        }

        function selNum() {
            let num = 0;
            // let all = $('.all-goods input[type="checkbox"]').length;
            console.log($('.all-goods input[type="checkbox"]'))
            $('.all-goods input[type="checkbox"]').each(function(i, item) {
                if (this.checked) {
                    num += 1;
                }
                // console.log(num)
            })
            return num;

        }

        function totalPrice() {
            let regP = /[\d\.]+$/g;
            let total = 0;
            if ($('.all-goods').html()) {
                $('.all-goods .goodsbox').each(function() {
                    if ($(this).find('input')[0].checked) {
                        let arrp = $(this).find('.price').text().match(regP);
                        let price = Number(arrp[0]);
                        let num = Number($(this).find('.val').text());
                        console.log(price, num);
                        total += price * num;
                    }

                })
                return total.toFixed(2);
            }

        }

        function inputRed() {
            $('footer .closing').css({
                'background-color': '#e72907',
                color: '#fff'
            })
            $('footer .closing').text(`请结算(${selNum()})`)
        }

        function inputGred() {
            $('footer .closing').css({
                'background-color': '#ebe4e4',
                color: '#999'
            }).text('请选择')
        }
        // 判断加减中间的数是否1
        // ele:goodsbox
        function isSmallOne(ele) {

            if (Number(ele.find('.val').text()) <= 1) {
                ele.find('.dec').css({
                    color: '#858383'
                })
            } else {
                ele.find('.dec').css({
                    color: '#000'
                })
            }
        }
    }).fail(function(err) {
        console.log('购物车请求失败', err);
    })


})