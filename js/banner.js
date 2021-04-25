 window.addEventListener('load', function() {

    // 轮播图制作
    // 获取对象
    const arrow_l = document.querySelector('.arrow-l');
    const arrow_r = document.querySelector('.arrow-r');
    const focus = document.querySelector('.focus');
    const ul = focus.querySelector('ul');
    const ol = focus.querySelector('.circle');
    const focusWidth = focus.offsetWidth;  //获得父盒子的宽度
    const banner_picture = document.querySelector('#banner-picture');
    let banner_bg = document.querySelector('.banner-bg');
    const sum = 10;  // 手动输入照片的张数
    let num = 1;
    let timer = null;


    for(let i = 0; i < sum; i++) {
        let li = document.createElement('li');
        li.setAttribute('index', i+1);  // 记录小圆圈的索引号
        ol.appendChild(li);
        ol.children[i].addEventListener('click', function() {
            for(let j = 0; j < sum; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            num = this.getAttribute('index');
            banner_picture.src = 'imgs/banner'+ num +'.jpg';
            banner_bg.style.background = 'url(imgs/banner-bg'+ num +'.jpg) no-repeat center center';
            banner_bg.style.backgroundSize = '6000px';
        })
    }
    ol.children[0].className = 'current';

    arrow_l.addEventListener('click', function() {
        num--;
        if(num == 0) {
            num = sum;
        }
        banner_picture.src = 'imgs/banner'+ num +'.jpg';
        banner_bg.style.background = 'url(imgs/banner-bg'+ num +'.jpg) no-repeat center center';
        banner_bg.style.backgroundSize = '6000px';
        for(let j = 0; j < sum; j++) {
            ol.children[j].className = '';
        }
    ol.children[num - 1].className = 'current';

    })

    arrow_r.addEventListener('click', function() {  
        num++;
        if(num == sum + 1) {
            num = 1;
        }
        banner_picture.src = 'imgs/banner'+ num +'.jpg';
        banner_bg.style.background = 'url(imgs/banner-bg'+ num +'.jpg) no-repeat center center';
        banner_bg.style.backgroundSize = '6000px';
        for(let j = 0; j < sum; j++) {
            ol.children[j].className = '';
        }
    ol.children[num - 1].className = 'current';

    })

    // 设置自动播放

    timer = setInterval(function(){
        arrow_r.click();
    }, 3000);

    focus.addEventListener('mouseenter', function() {
        clearInterval(timer);
        timer = null;
    })

    focus.addEventListener('mouseleave', function() {
        timer = setInterval(function() {
            arrow_r.click();
        }, 3000);
    })
    
    // 轮播图部分结束

    // 新碟上市部分轮播图开始

    // 获取元素
    // const new_arrowl = document.querySelector('.new-arrowl');
    // const new_arrowr = document.querySelector('.new-arrowr');
    // const ul_one = document.querySelector('.ul-one');
    // const ul_two = document.querySelector('.ul-two');
    // const ul_one_left = ul_one.offsetLeft;
    // const ul_two_left = ul_two.offsetLeft;
    // let new_sum;
    // new_sum = 0;

    // new_arrowl.addEventListener('click', function() {
    //     new_sum++;
    //    if (new_sum % 2 != 0) {
    //     ul_one.style.left = ul_two_left + 'px';
    //     ul_two.style.left = ul_one_left + 'px';
    // } else {
    //     ul_two.style.left = ul_two_left + 'px';

    //     ul_one.style.left = ul_one_left + 'px';
    //    }
    // })

    // new_arrowr.addEventListener('click', function() {
    //     new_sum++;
    //     if (new_sum % 2 == 0) {
    //         ul_one.style.left = ul_one_left + 'px';
    //         ul_two.style.left = ul_two_left + 'px';
    //     } else {
    //         ul_one.style.left = ul_two_left + 'px';
    //         ul_two.style.left = ul_one_left + 'px';
    //     }
       
    // })

    // 新碟上市轮播图结束


    const new_arrowl = document.querySelector('.new-arrowl');
    const new_arrowr = document.querySelector('.new-arrowr');
    const new_ul = document.querySelector('.new-ul');
    const new_uls = document.querySelector('.uls');
    const new_focusWidth = new_uls.offsetWidth;
    let new_num = 0;;
    let flag = true;
    console.log(new_uls.offsetWidth);
    console.log(new_ul.offsetWidth);
    new_arrowr.addEventListener('click', function() {
      if (flag) {
            flag = false;
        if (new_num == 2) {
            new_num = 0;
            new_ul.style.left = 0;
        }
        new_num++;
        animate(new_ul, -new_num * new_focusWidth, function() {
            flag = true;
        });
      }
    })
    
    new_arrowl.addEventListener('click', function() {
        if (flag) {
              flag = false;
          if (new_num == 0) {
              new_num = 2;
              new_ul.style.left = -new_num * new_focusWidth;
          }
          new_num--;
          animate(new_ul, -new_num * new_focusWidth, function() {
              flag = true;
          });
        }
      })




/* 
    // 根据图片的数量自动生成小圆点
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);   // 记录当前小圆圈的索引号
        ol.appendChild(li);
        ol.children[i].addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            // 点击圆圈实现滚动
            var index = this.getAttribute('index');
            // 当我们点击某个Li,把索引号给num
            num = index;
            // 当我们点击某个li，把索引号给circle
            circle = index;
            animate(ul, - focusWidth * index);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片放到ul坐后面
    var first = ul.children[0].cloneNode(true);   // 克隆包括子节点
    ul.appendChild(first);
    // 点击箭头实现滚动图片
    var num = 0;
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;   // 等到动画结束后再打开节流阀
            });
            // 点击右侧小箭头，小圆圈也跟着变化
            circle++;
            if (circle == ol.children.length) {  //注意是ol长度，比ul长度少1
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    // 最后，实现自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
    // 鼠标经过时停止自动播放
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    });
    // 鼠标离开时自动播放
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });

    // 点击左侧箭头实现播放图片
    arrow_l.addEventListener('click', function () {
        console.log(flag);
        if (flag) {
            flag = false; //关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';  // 此时来到最后一张图片，但最后一张图片跟第一张一样
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;   // 等到动画结束后再打开节流阀
            });
            // 点击右侧小箭头，小圆圈也跟着变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    // 轮播图部分结束
*/

 })