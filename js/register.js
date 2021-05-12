window.addEventListener('load', function () {

    
    let tel = document.querySelector('.tel');
    let pas = document.querySelector('.pas');
    let next_step = document.querySelector('.next-step');
    let tips = document.querySelector('.tips');
    let phoneNum = document.querySelector('.send-phoneId');
    let reSend = document.querySelector('.resend');
    let checkNumInputs = document.querySelector('.checknumber').querySelectorAll('input');
    let registerFinish = document.querySelector('.register-finish');
    let register = document.querySelector('.register');
    let sendFinish = document.querySelector('.send-finish');
    let mistake = document.querySelector('.mistake');


    // next_step.addEventListener('click', function () {
    //     let check = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    //     if (!check.test(tel.value)) {

    //     }








// })

tel.addEventListener('blur', function () {
    if (tel.value != '') {
        let check = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!check.test(tel.value)) {
            tips.children[0].style.color = 'red';
            tips.children[0].innerHTML = '<i></i>手机号码格式不对！'
            //    注意设置背景图要在改变innerhtml之后，不然会被覆盖掉
            tips.children[0].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
        } else {
            originAjax({
                url: 'https://autumnfish.cn/cellphone/existence/check',
                data: {
                    phone: tel.value
                },
                success: function (obj) {
                    console.log(obj);
                    if (obj.exist == 1) {
                        tips.children[0].style.color = 'red';
                        tips.children[0].innerHTML = '<i></i>该号码已被注册过！';

                        tips.children[0].querySelector('i').style.background = 'url(imgs/icon.png) no-repeat -50px -270px';
                    } else {
                        tips.children[0].style.color = 'green';
                        tips.children[0].innerHTML = '<i></i>手机号码格式正确！'
                        tips.children[0].querySelector('i').style.background = 'url(imgs/licon.jpeg) no-repeat';
                    }
                }
            })

        }

    }
})

let isCorect = false;

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
            isCorect = false
        } else {
            console.log(11);
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
    if (isCorect) {
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
                location.href = 'phonenumberLoad.html';
            },
            error: function(obj) {
                mistake.innerHTML = obj.message + '!';
            }
        })
    }




})






})