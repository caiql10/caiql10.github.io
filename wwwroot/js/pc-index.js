
$.ajax({
    type: 'get',
    url: '/pcData'
}).done(function(res) {
    console.log(res);
    // 渲染评论
    let commentStr="";
    res.forEach(element => {
        commentStr+=`
        <div class="item">
                    <div class="hd">
                        <img src=${element.touxiang} alt="">
                        <a href="">${element.name}</a>
                    </div>
                    <div class="bd">
                        <div class="title">${element.title}</div>
                        <p>${element.page}</p>
                    </div>
                    <div class="imgs">`;
        element.imgs.forEach(ele=>{
            commentStr+=`
            <img src=${ele} alt="">
            `;
        })
                  commentStr+=`      
                    </div>
                    <div class="actions">
                        <div class="replay">
                            <span>${element.rephone}</span>回应
                        </div>
                        <div class="like">
                            赞<span>(${element.good})</span>
                        </div>
                        <div class="reshare">
                            <span>${element.transmit}</span>转发
                        </div>
                    </div>
                </div>
        `;
    });
    $('.commentCons .items-box').html(commentStr);
    // 刷新
    $('.gallery-latest').on('click',function(){
        location.reload();
        $(window).scrollTop(0);
        
    });
    $('.gallery-more').on('click',function(){
        $.ajax({
            type:'get',
            url:'/pcgalleryMore'
        }).done(function(res1){
            // console.log(res1);
            let addCommentStr="";
            res1.forEach(element => {
                addCommentStr+=`
                <div class="item">
                            <div class="hd">
                                <img src=${element.touxiang} alt="">
                                <a href="">${element.name}</a>
                            </div>
                            <div class="bd">
                                <div class="title">${element.title}</div>
                                <p>${element.page}</p>
                            </div>
                            <div class="imgs">`;
                element.imgs.forEach(ele=>{
                    addCommentStr+=`
                    <img src=${ele} alt="">
                    `;
                })
                addCommentStr+=`      
                            </div>
                            <div class="actions">
                                <div class="replay">
                                    <span>${element.rephone}</span>回应
                                </div>
                                <div class="like">
                                    赞<span>(${element.good})</span>
                                </div>
                                <div class="reshare">
                                    <span>${element.transmit}</span>转发
                                </div>
                            </div>
                        </div>
                `;
            });
            $('.commentCons .items-box').append(addCommentStr);
        }).fail(function(err1){
            console.log(err1);
        })
    })
    console.log(navigator.userAgent)
    if(navigator.userAgent.indexOf('Mobile')!=-1){
        location.assign('../index.html');
    }
}).fail(function(err) {
    console.log(err);
})