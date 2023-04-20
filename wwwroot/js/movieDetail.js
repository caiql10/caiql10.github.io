let urlPath = location.href;
console.log(urlPath);
let idStr = urlPath.split('?')[1].split('=')[1];
// 头部相关信息
let random1 = parseInt(Math.random() * 30 + 1);
$.ajax({
    type: 'post',
    url: '/selectMovie',
    data: { id: idStr },
}).done(function(res) {
    // 头部标题
    $('header .movie').html(`
    <img src=${res.firstImg} alt="">
    <div class="info">
        <p class="name">${res.title}</p>
        <p>
            <span class="starts"></span>
            <span class="score">${res.score}</span>
        </p>
    </div>
    `);
    starts($('header .starts'));
    // console.log(res);
    $('body').css({
        "background-image": `linear-gradient(180deg,${res.bg0},30%,${res.bg1})`
    });
    // 电影基本详情
    let movieBascStr = '';
    movieBascStr += `
    <div class="left-img">
    <img src=${res.firstImg} alt="">
</div>
<div class="right-info">
    <h1>${res.title}</h1>
    <h2>${res.entitle}</h2>
    <div class="tag">
        <span class="no">No.${random1}</span>
        <span class="nodesc">${res.model}</span>
    </div>
    <p class="actors">${res.bascAct}</p>
    <div class="looks">
        <p class="want"><span>想看</span></p>
        <p class="looked"><span>看过</span></p>
    </div>
</div>
    `
    $('.movie-bascInfo').html(movieBascStr);
    // 电影基本详情end

    // 豆瓣评分

    let movieGradeStr = '';
    movieGradeStr += `
     <div class="top">
                    <span>豆瓣评分</span>
                </div>
                <div class="center-box">
                    <div class="left-score">
                        
                        <p class="star">
                        <span class="score">${res.score}</span>
                            <span class="starts"></span>
                           
                        </p>
                    </div>
                    <div class="right">
                        <div class="box">
                            <div class="sss">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div class="line">
                                <p></p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="sss">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>
                            <div class="line">
                                <p></p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="sss">
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>
                            <div class="line">
                                <p></p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="sss">
                                <span></span>
                                <span></span>

                            </div>
                            <div class="line">
                                <p></p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="sss">
                                <span></span>

                            </div>
                            <div class="line">
                                <p></p>
                            </div>
                        </div>
                        <div class="peos">${random(10000,60000)}人评分</div>
                    </div>
                </div>
                <div class="bottom">
                    <span class="looked">${res.look}人看过</span>
                    <span class="looking">${res.looking}人想看</span>
                </div>
    `
    $('.movie-grade').html(movieGradeStr);
    starts($('.movie-grade .center-box .starts'));
    let numRandom = [random(30, 60), random(20, 50), random(10, 20), random(10, 20), random(1, 10)];

    $('.movie-grade .line p').each(function(i) {
        $(this).css({
            width: `${numRandom[i]}%`
        })
    });
    // 豆瓣评分end

    // 播放源
    let movieSourceStr = "";
    movieSourceStr += `
    <span class="text">播放源</span>
        <div class="source-icon">
            <img src=${res.sourse} alt="">
            <span>></span>
    </div>
    `;
    $('.movie-source').html(movieSourceStr);
    // 播放源end

    // 简介
    let movieIntroStr = "";
    movieIntroStr += `
    <h2>简介</h2>
    <div class="cont">
    <p>${res.decration}</p>
    <span></span>
    </div>
    `;
    $('.movie-introduction').html(movieIntroStr);
    let content = $('.movie-introduction p').get(0);
    if (content.clientHeight < content.scrollHeight) {
        $('.movie-introduction span').text('展开');
        $('.movie-introduction span').on('click', function() {
            $('.movie-introduction p').css({
                '-webkit-line-clamp': '100'
            });
            $(this).css('display', 'none')
        })
    };
    // 简介end

    // 演职员
    let movieActorStr = "";
    movieActorStr += `<h2>演职员</h2>
    <ul class="actor">`
    res.actors.forEach(ele => {
        movieActorStr += `
    
        <li>
            <img src=${ele.img} alt="">
            <div class="info">
                <p class="name">${ele.peo}</p>
                <p class="play">${ele.play}</p>
            </div>
        </li>
    
    `;
    });
    movieActorStr += `</ul>`;
    $('.movie-actors').html(movieActorStr);
    // 演职员end
    let movieCreatorStr = "";
    movieCreatorStr += `
    <h2>创作者在豆瓣</h2>
                <ul class="creator">
    `;
    res.actors.forEach((ele, i) => {
        if (ele.isin) {
            movieCreatorStr += `
        
                    <li>
                        <div class="left">
                            <img src=${ele.img} alt="">
                            <div class="user">
                                <p class="name">${ele.peo}</p>
                                <p class="other">${random(1000,40000)}人关注豆瓣主页</p>
                            </div>
                        </div>
                        <div class="right"><span>+</span><span>关注</span></div>
                    </li>
                
        `;
            $('.movie-actors li').eq(i).append($('<span class="indouban">在豆瓣</span>'))
        }
    })
    movieCreatorStr += `</ul>`;
    $('.movie-creator').html(movieCreatorStr);
    // 豆瓣创作者end

    // 剧照
    let movieStillsStr = "";
    movieStillsStr += `<h2>剧照</h2>
    <ul class="stills">`;
    res.slideImgs.forEach((ele) => {
        movieStillsStr += `
            <li><img src=${ele} alt=""></li>
                
        `;
    });
    movieStillsStr += `</ul>`
    $('.movie-stills').html(movieStillsStr);
    // 剧照end

    // 短评
    let movieshorttalkStr = "";
    movieshorttalkStr += `<h2>
        <span>短评</span>
        <span>全部${random(1000,3000)} ></span>
    </h2>
    <div class="user-con">
    `;
    res.shorkTalk.forEach((item, i) => {
        movieshorttalkStr += `
        
    
        <div class="box">
            <div class="user-top">
                <div class="left">
                    <img src=${item.img} alt="">
                    <div class="info">
                        <p>${item.name}</p>
                        <div class="other">
                            <span class="starts"></span>
                            <span class="time">${item.time}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                <img src="./img/24gf-ellipsis.png" alt="">
                </div>
            </div>
            <div class="page">
                <p>${item.page}</p>
                <span class="open"></span>
                <span class="iconfont icon-dianzan"> ${random(100,500)}</span>
            </div>
        </div>
    
        `;
    })
    movieshorttalkStr += `
    <p class="moretalk"><span>查看全部短评</span><span class="row">></span></p>
    </div>`;
    $('.movie-shorttalk').html(movieshorttalkStr);
    res.shorkTalk.forEach((ele, i) => {
        nostarts($('.movie-shorttalk .starts').eq(i), ele.star);
        showAll($('.movie-shorttalk .page p').eq(i));
    });
    // 短评end

    // 喜欢这部电影的人也喜欢
    $('.movie-alsolike .movies li').each((i, item) => {
        if (++i % 3 == 0) {
            $(item).css({
                "margin-right": 0
            })
        }
    });
    starts($('.movie-alsolike .info .starts'));

    // 喜欢这部电影的人也喜欢end

    // 更多影评
    $('.movie-evaluate').css({
        top: `calc(${$(window).height()}px - 45px)`
    })
    $('.movie-evaluate').on('mousedown', function(e) {
            window.addEventListener('mousemove', moveFun);
            window.addEventListener('mouseup', function() {
                window.removeEventListener('mousemove', moveFun)
            })

            function moveFun(e) {
                let pageY = e.clientY;
                // pageY > screen.height ? pageY = e.screenY - e.offsetY : pageY = pageY;
                let maxTop = screen.height - 45;
                console.log(e.pageY, $(window).scrollTop())
                console.log(maxTop);
                if (pageY >= 30 && pageY <= 60) {
                    $('.movie-evaluate').css({
                        top: `calc(0.5rem)`
                    })
                    $('header').css({
                        position: "fixed",
                        top: '0',
                        left: 0,
                        right: 0,
                        height: '0.5rem',
                        "z-index": 6,
                        "background-image": `linear-gradient(180deg,${res.bg0},30%,${res.bg1})`
                    })
                    $('header .movie').css({
                        'display': 'flex'
                    });
                    $('header h1').css('display', 'none');
                    window.removeEventListener('mousemove', moveFun)
                    return;
                } else {
                    $('header').css({
                        position: "",
                        height: "0.45rem",
                        "background-image": ``
                    })
                    $('header .movie').css('display', 'none');
                    $('header h1').css('display', 'block');
                }
                // console.log(pageY);
                let last = $('.movie-evaluate').css('top').indexOf('px');
                let topnum = $('.movie-evaluate').css('top').substring(0, last);
                console.log('px', topnum, "Y", pageY, "pageY", e.pageY, 'screen', e.clientY);
                if (maxTop < pageY - 45) {
                    $('.movie-evaluate').css({
                        top: `calc(${Number(maxTop)}px)`

                    })
                    window.removeEventListener('mousemove', moveFun)
                    return;
                } else {
                    $('.movie-evaluate').css({
                        top: `calc(${pageY}px - 45px)`

                    })
                }

            }
        })
        // 更多影评渲染
    let movieEvaluStr = "";
    movieEvaluStr += `<div class="top-line"></div>
                <div class="title"><span>影评</span></div>
                <div class="content">`;
    res.shorkTalk.forEach(function(ele, i) {
        movieEvaluStr += `
        
                    <div class="box">
                        <div class="user-top">
                            <div class="left">
                                <img src=${ele.img} alt="">
                                <span class="name">${ele.name}</span>
                                <span class="looked">看过</span>
                                <span class="starts"></span>
                            </div>
                            <div class="right">${random(1,12)}月${random(1,29)}日</div>
                            

                        </div>
                        <div class="page">${ele.page}</div>
                        <div class="bottom-tool">
                            <span class="useful">${random(20,100)}有用</span>
                            <span class="tran">${random(20,100)}转发</span>
                        </div>
                 </div>
        `
    })
    movieEvaluStr += `   
                </div>`;
    $('.movie-evaluate').html(movieEvaluStr);
    $('.movie-evaluate .starts').each(function() {
        nostarts($(this), random(5, 10));
        console.log('a')
    })
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 2300) {
            $('.movie-evaluate').css({
                position: 'relative',
                width: '100%',
                top: '0'
            })

        } else {
            $('.movie-evaluate').css({
                position: 'fixed',
                width: '100%',
                top: `calc(${$(window).height()}px - 45px)`
            })
        }
    })
}).fail(function(err) {
    console.log('请求错误', err);
});

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

function nostarts(ele, startsScore) {
    ele.each(function(idx, item) {
        let light, dark, ld;
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
// 生成num1-num2的随机数
function random(num1, num2) {
    let n = Math.random() * (num2 - num1 + 1) + num1;
    return parseInt(n);
}
// 针对ele展开
function showAll(ele) {
    let con = ele.get(0);
    if (con.clientHeight < con.scrollHeight) {
        $(con).siblings('.open').text('展开');
        $(con).siblings('.open').on('click', function() {
            $(con).css({
                '-webkit-line-clamp': '100'
            });
            $(this).css('display', 'none')
        })
    };
}