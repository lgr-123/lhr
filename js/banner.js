
window.addEventListener('load', function () {

    // 轮播图制作
    // 获取对象
    
let banner = new Promise((resolve,reject) => {
    originAjax({
        url: 'https://autumnfish.cn/banner',
        data: {
            type: 0
        },
        success: function(obj) {
            resolve(obj);
        }
    })
})

banner.then((obj) => {

    let banners = obj.banners;
            const arrow_l = document.querySelector('.arrow-l');
            const arrow_r = document.querySelector('.arrow-r');
            const focus = document.querySelector('.focus');
            const ul = focus.querySelector('ul');
            const ol = focus.querySelector('.circle');
            const focusWidth = focus.offsetWidth;  //获得父盒子的宽度
            const banner_picture = document.querySelector('#banner-picture');
            let banner_bg = document.querySelector('.banner-bg');
            const sum = 10;  // 手动输入照片的张数
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
                    num = banners.length - 1 ;
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


    // originAjax({
    //     type: 'get',
    //     url: 'https://autumnfish.cn/banner',
    //     data: {
    //         type: 0
    //     },
    //     success: function(obj) {
    //         let banners = obj.banners;
    //         const arrow_l = document.querySelector('.arrow-l');
    //         const arrow_r = document.querySelector('.arrow-r');
    //         const focus = document.querySelector('.focus');
    //         const ul = focus.querySelector('ul');
    //         const ol = focus.querySelector('.circle');
    //         const focusWidth = focus.offsetWidth;  //获得父盒子的宽度
    //         const banner_picture = document.querySelector('#banner-picture');
    //         let banner_bg = document.querySelector('.banner-bg');
    //         const sum = 10;  // 手动输入照片的张数
    //         let num = 0;
    //         let timer = null;
        
    //     // console.log(banners);
    //     banner_picture.src = banners[0].imageUrl;
    //     banner_bg.style.background = 'url('+ banners[0].imageUrl +') no-repeat center center';
    //     banner_bg.style.backgroundSize = '100%';
           
    //     for (let i = 0; i < banners.length; i++) {
    //             let li = document.createElement('li');
    //             li.setAttribute('index', i + 1);  // 记录小圆圈的索引号
    //             ol.appendChild(li);
    //             ol.children[i].addEventListener('click', function () {
    //                 for (let j = 0; j < banners.length; j++) {
    //                     ol.children[j].className = '';
    //                 }
    //                 this.className = 'current';
    //                 num = this.getAttribute('index');
    //                 banner_picture.src = banners[i].imageUrl
    //                 banner_bg.style.background = 'url('+ banners[i].imageUrl +') no-repeat center center';
    //     banner_bg.style.backgroundSize = '100%';
    //     // banner_bg.style.backgroundSize = '6000px';
    //             })
    //         }
           
    //         ol.children[0].className = 'current';
        
    //         arrow_l.addEventListener('click', function () {
    //             num--;
    //             if (num < 0) {
    //                 num = banners.length - 1 ;
    //             }
    //             banner_picture.src = banners[num].imageUrl;
    //             banner_bg.style.background = 'url('+ banners[num].imageUrl +') no-repeat center center';
    //             banner_bg.style.backgroundSize = '6000px';
    //             for (let j = 0; j < banners.length; j++) {
    //                 ol.children[j].className = '';
    //             }
    //             ol.children[num].className = 'current';
        
    //         })
        
    //         arrow_r.addEventListener('click', function () {
    //             num++;
    //             if (num == banners.length) {
    //                 num = 0;
    //             }
    //             banner_picture.src = banners[num].imageUrl;
    //             banner_bg.style.background = 'url('+ banners[num].imageUrl +') no-repeat';
    //     banner_bg.style.backgroundSize = '100%';
    //     // banner_bg.style.backgroundSize = '6000px';
    //             for (let j = 0; j < banners.length; j++) {
    //                 ol.children[j].className = '';
    //             }
    //             ol.children[num].className = 'current';
        
    //         })
        
    //         // 设置自动播放
        
    //         timer = setInterval(function () {
    //             arrow_r.click();
    //         }, 3000);
        
    //         focus.addEventListener('mouseenter', function () {
    //             clearInterval(timer);
    //             timer = null;
    //         })
        
    //         focus.addEventListener('mouseleave', function () {
    //             timer = setInterval(function () {
    //                 arrow_r.click();
    //             }, 3000);
    //         })
        
    //         // 轮播图部分结束
    //     }
    // })
   

    // 新碟上市部分轮播图开始


    // 新碟上市轮播图结束

//   window.addEventListener('load', function() {
//     const banner_xhr = new XMLHttpRequest();
//     banner_xhr.open('GET', 'https://autumnfish.cn/banner?type=0');
//     banner_xhr.send();
//     banner_xhr.onreadystatechange = function() {
//         if (banner_xhr.readyState === 4 && banner_xhr.status === 200) {
//             let banner_obj = JSON.parse(banner_xhr.response);
//             // console.log(banner_obj.banners.length);
//             banners = banner_obj.banners;
// // console.log(banners.length);
//         }
//     }
//   })

    // console.log(banners.length);


    













    const new_arrowl = document.querySelector('.new-arrowl');
    const new_arrowr = document.querySelector('.new-arrowr');
    const new_ul = document.querySelector('.new-ul');
    const new_uls = document.querySelector('.uls');
    const new_focusWidth = new_uls.offsetWidth;
    let new_num = 0;;
    let flag = true;
    // console.log(new_uls.offsetWidth);
    // console.log(new_ul.offsetWidth);
    new_arrowr.addEventListener('click', function () {
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
        if (flag) {
            flag = false;
            if (new_num == 0) {
                new_num = 2;
                new_ul.style.left = -new_num * new_focusWidth;
            }
            new_num--;
            animate(new_ul, -new_num * new_focusWidth, function () {
                flag = true;
            });
        }
    })




   

})