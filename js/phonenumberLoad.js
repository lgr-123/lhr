window.addEventListener('load', function () {

    let user_phone = document.querySelector('#user-phone');
    let user_password = document.querySelector("#user-password");
    let user_submit = document.querySelector('.phone-submit');
    let user_errortip = document.querySelector('.load-errortip');
    let user_loaderror = document.querySelector('.load-error');
    let user_isTrue = true;
    let user_sendchecknum = document.querySelector('.check-text');
    let user_id = document.querySelector('.check-phoneId');
    let checknum = document.querySelector('.checknumber');
    let user_inputs = checknum.querySelectorAll('input');
    let user_checknums = '';
    let user_finish = document.querySelector('.phone-finish');
    let load_main = document.querySelector('.load-main');
    let send_checknum = document.querySelector('.send-checknum');
    let send_finish = document.querySelector('.send-finish');
    let user_close = document.querySelectorAll('.load-close');
    let send_phoneId = document.querySelector('.send-phoneId');
    let reSend = document.querySelector(".resend");

    // for (let i = 0; i < user_close.length; i++) {
    //     user_close[i].addEventListener('click', function() {
    //         this.parentNode.parentNode.style.display = 'none';
    //     })
    // }


    // 实现拖动登录框





    // 验证手机号码和密码是否正确
    user_submit.addEventListener('click', function () {
        user_isTrue = false;
        let tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!tel.test(user_phone.value)) {
            user_errortip.innerHTML = '请输入正确的手机号码格式！';
            user_loaderror.style.display = 'block';
            user_isTrue = false;
        } else {
            if (user_password.placeholder == '请输入密码') {
                user_errortip.innerHTML = '密码不能为空！';
                user_loaderror.style.display = 'block';
                user_isTrue = false;
            }
            if (user_password.value != '') {
                user_loaderror.style.display = 'none';
                user_isTrue = true
            }
        }

        if (user_isTrue) {
            originAjax({
                type: 'get',
                url: 'https://autumnfish.cn/login/cellphone',
                data: {
                    phone: user_phone.value,
                    password: user_password.value
                },
                success: function (obj) {
                    console.log(obj);
                    // 密码或账号输入错误时
                    if (obj.code != 200) {
                        user_errortip.innerHTML = '密码或手机号码不正确';
                        user_loaderror.style.display = 'block';
                    }
                    else {
                        // 密码账号都正确时
                        user_loaderror.style.display = 'none';
                        load_main.style.display = 'none';
                        send_checknum.style.display = 'block';
                        user_submit.setAttribute('phoneId', obj.account.id);
                        //    obj.account.id.slice(1,3);
                        // console.log(typeof obj.account.id);
                        let str = user_phone.value;
                        user_id.innerHTML = str.slice(0, 3) + '****' + str.slice(-3);
                    }

                }
            });
        }



    })

    // 发送验证码
    user_sendchecknum.addEventListener('click', function () {
        if (user_submit.getAttribute('phoneId')) {
            originAjax({
                type: 'get',
                url: 'https://autumnfish.cn/captcha/sent',
                data: {
                    phone: user_phone.value,
                },
                success: function (obj) {
                    console.log(obj);
                    send_checknum.style.display = 'none';
                    send_finish.style.display = 'block';
                    let str = user_phone.value;
                    send_phoneId.innerHTML = str.slice(0, 3) + '****' + str.slice(-3);
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
            });
        }

    })
    // getComputedStyle  获取元素样式
    // console.log(window.getComputedStyle(send_finish).display);

    // if (window.getComputedStyle(send_finish).display == 'block') {
    //     let k = 20;
    // let send_timer = null;
    //     send_timer = setInterval(function() {
    //         if (k > 0) {
    //             k--;
    //             reSend.innerHTML = k + 's';
    //         } else {
    //             reSend.innerHTML = '重新发送';
    //             clearInterval(send_timer);
    //         }
    //     }, 1000);
    // }


    reSend.addEventListener('click', function () {

        if (reSend.innerHTML == '重新发送') {
            originAjax({
                url: 'https://autumnfish.cn/captcha/sent',
                data: {
                    phone: user_phone.value,
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
        user_inputs[i].addEventListener('input', function () {
            if (this.value.length == 1) {
                this.style.borderColor = 'red';
                this.blur();
                if (i < 3 && user_inputs[i + 1].value.length == 0) {
                    user_inputs[i + 1].focus();
                }
            } else {
                this.style.borderColor = '#ccc';
            }

        })
    }

    // 检验验证码是否正确
    user_finish.addEventListener('click', function () {
        let isNull = true;
        for (let i = 0; i < 4; i++) {
            if (user_inputs[i].value == '') {
                isNull = false;
                break;
            }
        }

        if (isNull) {
            user_checknums = '';
            for (let i = 0; i < 4; i++) {
                user_checknums += user_inputs[i].value;
            }
            originAjax({
                type: 'get',
                url: 'https://autumnfish.cn/captcha/verify',
                data: {
                    phone: user_phone.value,
                    captcha: user_checknums
                },
                success: function (obj) {
                    console.log(obj);
                    location.href = 'index.html?userId=' +  user_submit.getAttribute('phoneId');

                }
            })
        }




    })






})