window.addEventListener('load', function () {


    // tel 手机号码
    let tel = document.querySelector('.tel');
    // pas 设置的密码
    let pas = document.querySelector('.pas');
    // next_step  点击下一步
    let next_step = document.querySelector('.next-step');
    // tips 提示
    let tips = document.querySelector('.tips');
    // phoneNum 显示要注册的号码
    let phoneNum = document.querySelector('.send-phoneId');
    // reSend 重新发送验证码
    let reSend = document.querySelector('.resend');
    // checkNumInputs 输入验证码的表格
    let checkNumInputs = document.querySelector('.checknumber').querySelectorAll('input');
    // registerFinish 注册成功
    let registerFinish = document.querySelector('.register-finish');
    // register  用户输入号码和密码的盒子
    let register = document.querySelector('.register');
    // sendFinish 用户输入验证码的盒子
    let sendFinish = document.querySelector('.send-finish');
    // mistake  验证码输入错误提示
    let mistake = document.querySelector('.mistake');

    // flag 判断号码是否正确
let flag = false;
// 当输入电话号码的input失去焦点时触发事件，验证号码
tel.addEventListener('blur', function () {
    // 用户有输入号码时
    if (tel.value != '') {
        // 正则表达式判断号码格式是否正确
        let check = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!check.test(tel.value)) {
            tips.children[0].style.color = 'red';
            tips.children[0].innerHTML = '<i></i>手机号码格式不对！'
            //    注意设置背景图要在改变innerhtml之后，不然会被覆盖掉
            tips.children[0].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
        } else {
            // 格式正确之后调用接口判断该号码是否被注册过
            originAjax({
                url: 'https://autumnfish.cn/cellphone/existence/check',
                data: {
                    // 用户号码
                    phone: tel.value
                },
                success: function (obj) {
                    // console.log(obj);
                    // 判断返回的数据
                    if (obj.exist == 1) {
                        tips.children[0].style.color = 'red';
                        tips.children[0].innerHTML = '<i></i>该号码已被注册过！';
                        tips.children[0].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
                        flag = false;
                    } else {
                        tips.children[0].style.color = 'green';
                        tips.children[0].innerHTML = '<i></i>手机号码格式正确！'
                        tips.children[0].querySelector('i').style.background = 'url(imgs/licon.jpeg) no-repeat';
                        flag = true;
                    }
                }
            })

        }

    }
})

// isCorect 通过该变量判断密码格式是否正确
let isCorect = false;
// 当密码框失去焦点时,通过逐个正则表达式判断密码格式是否正确,只有全部正确后才能点击下一步
pas.addEventListener('blur', function () {
    if (pas.value != '') {
        //   /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/  // 包含包含字母、数字、符号中至少两种
        //    /^.{8,20}$/  密码长度为8-20位
        //   let a = /^[^\x20]$/;
        let a = /[^\x20]+/
        if (!a.test(pas.value)) {
            tips.children[1].innerHTML = '<p><i></i> 密码不能包含空格</p>';
            tips.children[1].style.color = 'red';
            tips.children[1].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
            isCorect = false;
        } else {
            tips.children[1].style.color = 'green';
            tips.children[1].innerHTML = '<p><i></i>密码不包含空格</p>';
            tips.children[1].querySelector('i').style.background = 'url(imgs/licon.jpeg) no-repeat';
            isCorect = true;
        }

        let b = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/;
        if (!b.test(pas.value)) {
            tips.children[2].innerHTML = '<p><i></i>密码必须包含字母、数字、符号中至少两种</p>';
            tips.children[2].style.color = 'red';
            tips.children[2].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
            isCorect = false;
        } else {
            tips.children[2].style.color = 'green';
            tips.children[2].innerHTML = '<p><i></i>密码格式符合</p>';
            tips.children[2].querySelector('i').style.background = 'url(imgs/licon.jpeg) no-repeat';
            isCorect = true;
        }

        let c = /^.{8,20}$/;
        if (!c.test(pas.value)) {
            tips.children[3].innerHTML = '<p><i></i>密码长度为8-20位</p>';
            tips.children[3].style.color = 'red';
            tips.children[3].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
            isCorect = false;
        } else {
            tips.children[3].style.color = 'green';
            tips.children[3].innerHTML = '<i></i>密码长度符合！'
            tips.children[3].querySelector('i').style.background = 'url(imgs/licon.jpeg) no-repeat';
            isCorect = true
        }

    }
})


// 点击发送验证码
next_step.addEventListener('click', function () {
    // 号码和密码都全部正确
    if (isCorect && flag) {
        register.style.display = 'none';
        sendFinish.style.display = 'block';
        let str = tel.value;
        phoneNum.innerHTML = str.slice(0, 3) + '****' + str.slice(-3);
        originAjax({
            url: 'https://autumnfish.cn/captcha/sent',
            data: {
                phone: tel.value,
            },
            success: function (obj) {
                console.log(obj);
                let k = 20;
                let send_timer = null;
                send_timer = setInterval(function () {
                    if (k > 0) {
                        k--;
                        reSend.innerHTML = k + 's';
                    } else {
                        reSend.innerHTML = '重新发送';
                        clearInterval(send_timer);
                    }
                }, 1000);
            }
        })
    }
})



reSend.addEventListener('click', function () {

    if (reSend.innerHTML == '重新发送') {
        originAjax({
            url: 'https://autumnfish.cn/captcha/sent',
            data: {
                phone: tel.value,
            },
            success: function () {
                let k = 20;
                let send_timer = null;
                send_timer = setInterval(function () {
                    if (k > 0) {
                        k--;
                        reSend.innerHTML = k + 's';
                    } else {
                        reSend.innerHTML = '重新发送';
                        clearInterval(send_timer);
                    }
                }, 1000);
            }
        })
    }

})

// 输入验证码
for (let i = 0; i < 4; i++) {
    checkNumInputs[i].addEventListener('input', function () {
        if (this.value.length == 1) {
            this.style.borderColor = 'red';
            this.blur();
            if (i < 3 && checkNumInputs[i + 1].value.length == 0) {
                checkNumInputs[i + 1].focus();
            }
        } else {
            this.style.borderColor = '#ccc';
        }
        mistake.innerHTML = '';
    })
}


registerFinish.addEventListener('click', function () {
    let isNull = true;
    let user_checknums = '';
    for (let i = 0; i < 4; i++) {
        if (checkNumInputs[i].value == '') {
            isNull = false;
            break;
        } else {
            user_checknums += checkNumInputs[i].value;
        }
    }

    if (isNull) {
        originAjax({
            type: 'get',
            url: 'https://autumnfish.cn/captcha/verify',
            data: {
                phone: tel.value,
                captcha: user_checknums
            },
            success: function (obj) {
                console.log(obj);
                // 验证码验证成功后跳转到登录页面
                location.href = 'phonenumberLoad.html';
            },
            error: function(obj) {
                mistake.innerHTML = obj.message + '!';
            }
        })
    }




})






})