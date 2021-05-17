
window.addEventListener('load', function () {

    // 轮播图制作
    // 获取对象

    let banner = new Promise((resolve, reject) => {
        originAjax({
            url: 'https://autumnfish.cn/banner',
            data: {
                type: 0
            },
            success: function (obj) {
                resolve(obj);
            }
        })
    })

    banner.then((obj) => {

        let banners = obj.banners;
        const arrow_l = document.querySelector('.arrow-l');
        const arrow_r = document.querySelector('.arrow-r');
        const focus = document.querySelector('.focus');
        const ol = focus.querySelector('.circle');
        const banner_picture = document.querySelector('#banner-picture');
        let num = 0;
        let timer = null;

        // console.log(banners);
        banner_picture.src = banners[0].imageUrl;
        for (let i = 0; i < banners.length; i++) {
            let li = document.createElement('li');
            li.setAttribute('index', i + 1);  // 记录小圆圈的索引号
            ol.appendChild(li);
            ol.children[i].addEventListener('click', function () {
                for (let j = 0; j < banners.length; j++) {
                    ol.children[j].className = '';
                }
                this.className = 'current';
                num = this.getAttribute('index');
                banner_picture.src = banners[i].imageUrl
            })
        }

        ol.children[0].className = 'current';

        arrow_l.addEventListener('click', function () {
            num--;
            if (num < 0) {
                num = banners.length - 1;
            }
            banner_picture.src = banners[num].imageUrl;
            for (let j = 0; j < banners.length; j++) {
                ol.children[j].className = '';
            }
            ol.children[num].className = 'current';

        })

        arrow_r.addEventListener('click', function () {
            num++;
            if (num == banners.length) {
                num = 0;
            }
            banner_picture.src = banners[num].imageUrl;
            for (let j = 0; j < banners.length; j++) {
                ol.children[j].className = '';
            }
            ol.children[num].className = 'current';

        })

        // 设置自动播放

        timer = setInterval(function () {
            arrow_r.click();
        }, 3000);

        focus.addEventListener('mouseenter', function () {
            clearInterval(timer);
            timer = null;
        })

        focus.addEventListener('mouseleave', function () {
            timer = setInterval(function () {
                arrow_r.click();
            }, 3000);
        })

    })



    // new_arrowl 点击播放左按钮
    const new_arrowl = document.querySelector('.new-arrowl');
    // new_arrowr 点击播放右按钮
    const new_arrowr = document.querySelector('.new-arrowr');
    var new_num = 0;;
    let flag = true;
    // console.log(new_uls.offsetWidth);
    // console.log(new_ul.offsetWidth);

    new_arrowr.addEventListener('click', function () {
        let new_ul = document.querySelector('.new-ul');
        let new_uls = document.querySelector('.uls');
        let new_focusWidth = new_uls.offsetWidth;

        if (flag) {
            flag = false;
            if (new_num == 2) {
                new_num = 0;
                new_ul.style.left = 0;
            }
            new_num++;
            animate(new_ul, -new_num * new_focusWidth, function () {
                flag = true;
            });
        }
    })

    new_arrowl.addEventListener('click', function () {
        let new_ul = document.querySelector('.new-ul');
        let new_uls = document.querySelector('.uls');
        let new_focusWidth = new_uls.offsetWidth;
        if (flag) {
            flag = false;
            if (new_num == 0) {
                new_num = 2;
                new_ul.style.left = -new_num * new_focusWidth + 'px';
            }
            new_num--;

            animate(new_ul, -new_num * new_focusWidth, function () {
                flag = true;
            });
        }
    })


    // let timer
    // new_arrowl.addEventListener('click', function() {
    //     clearInterval(timer);
    //      timer = setTimeout(function() {
    //         let new_ul = document.querySelector('.new-ul');
    //         let new_uls = document.querySelector('.uls');
    //         let new_focusWidth = new_uls.offsetWidth;
    //         if (new_num == 0) {
    //             new_num = 4;
    //             new_ul.style.left = -new_num * new_focusWidth + 'px';
    //         }
    //         new_num--;
    //         new_ul.style.left = -new_num * new_focusWidth + 'px';
    //     },200)


    // })




})