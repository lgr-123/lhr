window.addEventListener('load', function () {

    // user_phone 用户输入的手机号码
    let user_phone = document.querySelector('#user-phone');
    // user_password  用户输入的密码
    let user_password = document.querySelector("#user-password");
    // user_submit 登录按钮
    let user_submit = document.querySelector('.phone-submit');
    // user_errortip 密码或账号输入错误时提示
    let user_errortip = document.querySelector('.load-errortip');
    // user_loaderror 存放错误提示信息的盒子
    let user_loaderror = document.querySelector('.load-error');
    // user_isTrue 用来判断密码和号码输入是否正确
    let user_isTrue = true;
    // user_sendchecknum 点击发送验证码
    let user_sendchecknum = document.querySelector('.check-text');
    // user_id 用来显示用户号码前几个数
    let user_id = document.querySelector('.check-phoneId');
    // checknum  输入验证码的盒子
    let checknum = document.querySelector('.checknumber');
    // user_inputs 输入验证码的输入框
    let user_inputs = checknum.querySelectorAll('input');
    let user_checknums = '';
    // user_finish 点击可提交验证码
    let user_finish = document.querySelector('.phone-finish');
    let load_main = document.querySelector('.load-main');
    let send_checknum = document.querySelector('.send-checknum');
    let send_finish = document.querySelector('.send-finish');
    let send_phoneId = document.querySelector('.send-phoneId');
    // reSend 重新发送验证码
    let reSend = document.querySelector(".resend");
  

    // 验证手机号码和密码是否正确
    user_submit.addEventListener('click', function () {
        user_isTrue = false;
        // 正则表达式判断号码格式是否正确
        let tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!tel.test(user_phone.value)) {
            user_errortip.innerHTML = '请输入正确的手机号码格式！';
            // 显示错误提示
            user_loaderror.style.display = 'block';
            user_isTrue = false;
        } else {
            if (user_password.placeholder == '请输入密码') {
                user_errortip.innerHTML = '密码不能为空！';
                user_loaderror.style.display = 'block';
                user_isTrue = false;
            }
            if (user_password.value != '') {
                 // 密码账号都输入格式正确时
                user_loaderror.style.display = 'none';
                user_isTrue = true
            }
        }
    //    调用接口判断密码是否正确
        if (user_isTrue) {
            originAjax({
                type: 'get',
                url: 'https://autumnfish.cn/login/cellphone',
                data: {
                    // 传入号码密码
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
                        // 密码账号都正确时，隐藏该盒子
                        user_loaderror.style.display = 'none';
                        load_main.style.display = 'none';
                        // 显示发送验证码的盒子
                        send_checknum.style.display = 'block';
                        // 将用户的手机id和登录成功的cookie保留下来
                        user_submit.setAttribute('phoneId', obj.account.id);
                        user_submit.setAttribute('cookie', obj.cookie);
                        // 提示手机号码前几个和后几个数字
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
            // 调用接口发送验证码
            originAjax({
                type: 'get',
                url: 'https://autumnfish.cn/captcha/sent',
                data: {
                    phone: user_phone.value,
                },
                success: function (obj) {
                    // console.log(obj);
                    // 成功后隐藏该盒子，显示输入验证码的盒子
                    send_checknum.style.display = 'none';
                    send_finish.style.display = 'block';
                    let str = user_phone.value;
                    send_phoneId.innerHTML = str.slice(0, 3) + '****' + str.slice(-3);
                    let k = 20;
                    let send_timer = null;
                    // 开启定时器，20秒过后可以重新发送验证码
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
    // 20秒过后点击重新发送验证码
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

    // 点击检验验证码是否正确
    user_finish.addEventListener('click', function () {
        let isNull = true;
        // 先判断是否有输入验证码
        for (let i = 0; i < 4; i++) {
            if (user_inputs[i].value == '') {
                isNull = false;
                break;
            }
        }

        if (isNull) {
            user_checknums = '';
            for (let i = 0; i < 4; i++) {
                // 获取验证码
                user_checknums += user_inputs[i].value;
            }
            originAjax({
                type: 'get',
                url: 'https://autumnfish.cn/captcha/verify',
                data: {
                    phone: user_phone.value,
                    captcha: user_checknums
                },
                // 成功后跳转到主页面，并带上用户id和cookie,很重要
                success: function (obj) {
                    console.log(obj);
                    location.href = `index.html?userId=${user_submit.getAttribute('phoneId')}&cookie=${user_submit.getAttribute('cookie')}`;
                },
                error: function() {
                    alert("请输入正确的验证码！");
                }
            })
        }
    })
})