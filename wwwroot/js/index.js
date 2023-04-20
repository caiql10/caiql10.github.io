// pc电脑切换
console.log(navigator.userAgent)
if(navigator.userAgent.indexOf('Mobile')==-1){
    location.assign('../pc-index.html');
}
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

// tab切换底部横线
$('#main-tabs p').on('click', function() {
    let width = $(this).width() * $(this).index();
    if (width == 0) {
        $(this).parent().siblings('.selected').css({
            transform: `translateX(${(width) / 100}rem)`

        })
    } else {
        $(this).parent().siblings('.selected').css({
            transform: `translateX(0.5rem)`

        })
    }

    $(this).addClass('on').siblings().removeClass('on')


});
// tab切换内容
$('#main-tabs p:eq(0)').on('click', () => {

    $('.dynatic-con').show(500).siblings('.recommend').hide(500);
})
$('#main-tabs p:eq(1)').on('click', () => {

        $('.recommend').show(500).siblings('.dynatic-con').hide(500);
    })
    // 动态动画
setInterval(function() {
    $('.dynatic-con .page').animate({
        top: '-1em'
    }, 1500, function() {
        $(this).css('top', 0)
    })
}, 5000);
// 推荐区域渲染
function addRecHtml(start, end) {
    let recommedStr = ''
    tuijianData.forEach((ele, i) => {
        if (i >= start && i <= end) {
            recommedStr += `
<div class="con-box">
                    <div class="user-top">
                        <div class="name">
                            <img src=${ele.headUrl} alt="">
                            <span class="uName">${ele.userName}</span>
                        </div>
                        <img class="eli" src="./img/elli.png" alt="">
                    </div>
                        <div class="user-center">
                            <p class="tag">${ele.tag}</p>
                            <div>
                            <p class="page">${ele.page}</p>
                            <span class="showPage">全文</span>
                            </div>
                            
                            <img src=${ele.imgUrl} alt="">
                        </div>
                        <div class="user-bottom">
                            <div class="good">
                                <span class="iconfont icon-dianzan"></span>
                                <span class="num-G">${ele.good}</span>
                            </div>
                            <div class="msg">
                                <span class="iconfont icon-jurassic_message"></span>
                                <span class="num-M">${ele.msg}</span>
                            </div>
                            <div class="loop">
                                <span class="iconfont icon-loop"></span>
                                <span class="num-L">转发</span>
                            </div>
                        </div>
                    
                </div>
`
        }

    })
    $('main .recommend').append(recommedStr);

}
addRecHtml(0, 2);


// 点赞
let goodCount = new Array(tuijianData.length);
$.each(goodCount, function(i, ele) {
    goodCount[i] = 0;

});
// 显示全文
let showCount = new Array(tuijianData.length);
$.each(showCount, function(i, ele) {
    showCount[i] = 0;

});


function goodN() {
    for (let index = 0; index < goodCount.length; index++) {

        // console.log(index);
        $('.recommend .good').eq(index).on('click', function(e) {
            if (index < $('.recommend .good').length) {
                console.log(index, goodCount);
                let numbox = $(this).children('.num-G')
                let num = parseInt(numbox.text());
                goodCount[index] = goodCount[index] + 1;
                if (goodCount[index] % 2 != 0) {
                    $(this).children('.iconfont').css('color', 'red');
                    numbox.css('color', 'red');
                    numbox.text(++num);
                } else {
                    $(this).children('.iconfont').css('color', '#6c6a6a');
                    numbox.css('color', '#6c6a6a');
                    numbox.text(--num);
                }
            }
        })
        $('.con-box .user-center .showPage').eq(index).on('click', function(e) {
            if (index < $('.con-box .user-center .showPage').length) {
                e.stopPropagation();
                showCount[index] = showCount[index] + 1;
                if (showCount[index] % 2 != 0) {
                    $(this).siblings('.page').css({
                        '-webkit-line-clamp': '1000'
                    })
                    $(this).html('收起全文');

                } else {
                    $(this).siblings('.page').css({
                        '-webkit-line-clamp': '5'
                    })
                    $(this).html('全文');
                }
            }
        });


    }


}
// goodN()

// 渲染推荐区域里的发现小组
let groupsStr = `
<div class="group">
<h1>发现小组 <div class="swiper-pagination"></div></h1>
<div class="swiper">
<div class="swiper-wrapper">
`;
let groupsCount = 0;
groups.forEach((ele, index) => {
    if (index % 3 == 0) {
        groupsStr += `<div class="swiper-slide">
        <span class="tag">你可能感兴趣的事</span>`
        groupsCount = 0;

    } else {
        groupsCount++;
    }


    groupsStr += `
    <div class="con-box">
        <div class="left">
            <img src=${ele.imgurl} alt="">
            <div class="msg">
                <h2>${ele.h2}</h2>
                <p class="info">${ele.info}</p>
                <p class="members">${ele.member}</p>
            </div>
        </div>
        <div class="right">
            <span>+</span>
            <span>加入</span>
        </div>
    </div>
    `
    if (groupsCount == 2) {
        groupsStr += `</div>`
    }
})
groupsStr += `</div>
</div>
<div class="more">更多小组></div>
</div>`;
$('.recommend').append(groupsStr);

// 轮播
var mySwiper = new Swiper('.swiper', {
    autoplay: true, //可选选项，自动滑动
    pagination: {
        el: '.swiper-pagination',
    },
    touchRatio: 0.5, //触摸变慢
})

// 动态加载更多
let i = 3;
$(window).scroll(function(e) {

        let docHeigth = $(document).height(),
            winHeight = $(window).height(),
            winSrc = Math.floor($(window).scrollTop());

        if (winSrc >= docHeigth - winHeight - 1) {

            while (i < 7) {
                let oldi = i;
                i = i + 2;
                addRecHtml(oldi, i);
                console.log(i);
                console.log($('.recommend .good').length)
                if (i == 7) {
                    goodN();
                }
            }
        }

    })
    // goodN();