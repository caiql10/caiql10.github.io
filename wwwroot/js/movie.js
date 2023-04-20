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

// 星星分数 
function starts(ele) {
    ele.each(function(idx, item) {
        let light, dark, ld;
        let startsScore = Number($(item).siblings('.score').text());
        if (parseInt(startsScore) < startsScore) {
            light = Math.floor(startsScore / 2);
            ld = 1;
            dark = 5 - light - ld;
        } else {
            light = startsScore / 2;
            ld = 0;
            dark = 5 - light - ld;
        }
        let lightStr = '<span class="light"></span>'
        let darkStr = '<span class="dark"></span>'
        let ldStr = '<span class="dark-light"></span>'
        $(this).html(lightStr.repeat(light) + ldStr.repeat(ld) + darkStr.repeat(dark));
        console.log(ld);
    });
}
starts($('.movie-hot .starts'))

// 星星分数2
starts($('.rank .starts'))

// 片单渲染
let uflqStr = ''
dataM.forEach(function(ele) {
    uflqStr += `
    <div class="list" style="background-color: rgba(160, 153, 165, 0.12);">
    <div class="imgbox">
        <img src=${ele.imgUrl} style="background-color: transparent;">
    </div>
    <div class="right">
        <div class="_9rEc3">${ele.h2Title}</div>
        <div class="bottom">
            <span class="num">共${ele.num}部</span>
            <span class="people">${ele.people}人关注</span>
        </div>
    </div>
</div>
    `
})
$('.ufl-q').html(uflqStr);

// 找电影目录
$('.catalogue .box1 .list>.extra').each(function() {
    $(this).children('li').each(function(i) {
        if ((i + 1) % 4 == 0) {
            $(this).css("margin-right", "0")
        }
    })

})
$('.catalogue .box1>.list:not(.down)').on({
    click: function(e) {
        if ($(this).children('.extra').css('display') == 'none') {

            $(this).siblings('.list').children('.extra').css('display', 'none');
            $(this).siblings('.list').children('img').css({
                transform: "rotateZ(0deg)"
            })
            $(this).children('.extra').css({
                display: 'flex'
            })
            $(this).children('.extra').addClass('animate__fadeInLeft animate__animated')
            $(this).children('img').css({
                transform: "rotateZ(-180deg)"
            })
        } else {

            $(this).children('.extra').css({
                display: 'none'
            })
            $(this).children('img').css({
                transform: "rotateZ(0deg)"
            })
        }
    }
});
let typeO = ['类型', '地区', '排序'];
// 目录变换
$('.catalogue .box1>.list:not(.down) .extra li').on('click', function(e) {
    e.stopPropagation();
    $(this).addClass('add').siblings('li').removeClass('add');
    if ($(this).index() === 0) {
        let i = $(this).parents('.list').index();
        $(this).parents('.list').children('span').text(typeO[i - 1]);
        $(this).parents('.list').children('span').css('color', '#000')
    } else {
        let value = $(this).text();
        $(this).parents('.list').children('span').text(value);
        $(this).parents('.list').children('span').css({
            color: "#03c32b"
        })
    }
})

// 找电影的内容
$.ajax({
    type: 'get',
    url: '/allMovie',

}).done(function(res) {
    // console.log(res)
    let moviesStr = '';
    res.forEach(function(ele, i) {
        // console.log(ele.slideImgs);
        moviesStr += `
        <a href="./movieDetail.html?id=${ele.id}" class="movie-list">
            <div class="top-img">
                <div class="left">
                    <img src=${ele.firstImg} alt="">
                </div>
                <div class="swiper swiper${i+1}">
                
                <div class="swiper-wrapper">
                
                                `;
        ele.slideImgs.forEach(function(item) {
            moviesStr += `
            <div class="swiper-slide">
                <img src=${item} alt="">
            </div>
            `
        })
        moviesStr += `
            </div>
            <div class="swiper-pagination pagination${i+1}"></div>
            </div>
        </div>
            <div class="movie-title">
                <div class="left">
                <h2>${ele.title}</h2>
                <p>
                    <span class="starts"></span>
                    <span class="score">${ele.score}</span>
                </p>
                <span class="basc">${ele.bascAct}</span>
                </div>
                <div class="right">
                    想看
                </div>
                </div>
                <div class="desc">${ele.decration}</div>
                <div class="tags">
                <div class="sourse">
                                <span>可播放</span>
                                <img src=${ele.sourse} alt="">
                                <span>></span>
                                </div>
        `
        ele.tags.forEach(function(item1) {
            moviesStr += `<span>${item1} ></span>`
        })


        moviesStr += `
            
            </div>
            </a>
        `
    })
    $('.search-movies .all-movies').html(moviesStr);
    // 星星
    starts($('.movie-list .starts'));
    let myswiper = new Swiper('.swiper1', {
        autoplay: true, //可选选项，自动滑动
        pagination: {
            el: '.pagination1',
        },
        touchRatio: 0.5, //触摸变慢
    })
    let myswiper2 = new Swiper('.swiper2', {
        autoplay: true, //可选选项，自动滑动
        pagination: {
            el: '.pagination2',
        },
        touchRatio: 0.5, //触摸变慢
    })
    let myswiper3 = new Swiper('.swiper3', {
        autoplay: true, //可选选项，自动滑动
        pagination: {
            el: '.pagination3',
        },
        touchRatio: 0.5, //触摸变慢
    })
    let myswiper4 = new Swiper('.swiper4', {
        autoplay: true, //可选选项，自动滑动
        pagination: {
            el: '.pagination4',
        },
        touchRatio: 0.5, //触摸变慢
    })

}).fail(function(err) {
    console.log('请求错误', err);

})

// 滚动监听
$(window).scroll(function() {
    let scrollH = $(this).scrollTop();
    if (scrollH >= 1100) {
        $('header').css({
            position: 'fixed',
            top: '0',
            left: '0',
            right: 0,
            "z-index": 7
        })
        $('.catalogue').css({
            "margin-top": 0,
            position: 'fixed',
            top: '0.45rem',
            left: "0",
            right: 0,
            "box-sizing": "border-box",
            padding: "0 0.1rem",
            "z-index": 7,
            "padding-bottom": "0.1rem"
        })
    } else {
        $('header').css({
            position: '',
        })
        $('.catalogue').css({
            "margin-top": "0.2rem",
            width: "100%",
            "box-sizing": "content-box",
            position: '',
            "padding": "0rem"
        })
    }
})