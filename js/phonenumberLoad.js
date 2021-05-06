window.addEventListener('load', function () {

    let user_phone = document.querySelector('#user-phone');
    let user_password = document.querySelector("#user-password");
    let user_submit = document.querySelector('.phone-submit');
    let user_errortip = document.querySelector('.load-errortip');
    let user_loaderror = document.querySelector('.load-error');
    let user_isTrue = true;
    let user_sendchecknum = document.querySelector('.check-text');
    let checknum = document.querySelector('.checknumber');
    let user_inputs = checknum.querySelectorAll('input');
    let user_checknums = '';
    let user_finish = document.querySelector('.phone-finish');
    let load_main = document.querySelector('.load-main');
    let send_checknum = document.querySelector('.send-checknum');
    let send_finish = document.querySelector('.send-finish');
    let user_close = document.querySelectorAll('.load-close');

    // for (let i = 0; i < user_close.length; i++) {
    //     user_close[i].addEventListener('click', function() {
    //         this.parentNode.parentNode.style.display = 'none';
    //     })
    // }


// 实现拖动登录框





    // 验证手机号码和密码是否正确
    user_submit.addEventListener('click', function () {
        user_isTrue = false;
        if (user_phone.value.length != 11) {
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
                        user_submit.setAttribute('phoneId', obj.account.id );
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
                //    if(obj.code === 200) {
                //        originAjax({
                //            type: 'get',
                //            url: 'https://autumnfish.cn/captcha/verify?phone='+user_phone.value+'&captcha='
                //        })
                //    }
                send_checknum.style.display = 'none';
                send_finish.style.display = 'block';
            }
        });
       }

    })


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
                console.log(user_inputs[i].value);
                user_checknums += user_inputs[i].value;
            }
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
            }
        })


    })






})