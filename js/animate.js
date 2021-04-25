

function animate(obj, target, callback) {
    clearInterval(obj.timer);  // 先清除以前的定时器，只保留当前的
    // console.log(111);
    obj.timer = setInterval(function () {
    //   console.log(11);
    var j = 0;
    j++;
    if (j ==1) {
    // console.log(target);
    // console.log(obj.offsetLeft);
    }
        var step = (target - obj.offsetLeft) / 5.0;    // 修改步长值，
        step = step > 0 ? Math.ceil(step) : Math.floor(step);   // 步长值改为整数，不要出现小数问题
        
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if(callback) {
            //     callback();  // 有回调函数时执行回调函数
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 50);

}


// 沿着y轴移动
function animateY(obj, target, callback) {
    clearInterval(obj.timer);  // 先清除以前的定时器，只保留当前的
    obj.timer = setInterval(function () {
        var step = (target - window.pageYOffset) / 10;    // 修改步长值，
        step = step > 0 ? Math.ceil(step) : Math.floor(step);   // 步长值改为整数，不要出现小数问题
        if (window.pageYOffset == target) {
            clearInterval(obj.timer);
            // if(callback) {
            //     callback();  // 有回调函数时执行回调函数
            // }
            callback && callback();
        }
        // obj.style.left = obj.offsetLeft + step + 'px';
        window.scroll(0, window.pageYOffset + step);
    }, 15);

}



