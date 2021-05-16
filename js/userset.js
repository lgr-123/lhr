window.addEventListener('load', function () {
    
    // set 存放用户资料的盒子
    let set = document.querySelector('.base-set');
    // baseSet 基本设置
    let baseSet = document.querySelector('#base-set');
    // setUl 设置类型的ul
    let setUl = document.querySelector('.set-ul');
    // bindSet 绑定设置，功能还没有实现
    let bindSet = document.querySelector('#bind-set');


    // 点击第一个基本设置时
    setUl.children[0].addEventListener('click', function () {
        let promise1 = new Promise((resolve, reject) => {
            // 将基本设置的内容渲染出来
            set.innerHTML = baseSet.innerHTML;
            // 调用接口获取用户基本信息   
            originAjax({
                url: 'https://autumnfish.cn/user/account',
                data: {
                    cookie: getParam(location.href, 'cookie'),
                    num: Math.random
                },
                success: function (obj) {
                    // console.log(obj);
                    // 成功后再执行resolve函数
                    resolve(obj);
                }
            })
        })

        promise1.then((obj) => {
            // console.log(obj);
            // 绑定元素
            // setName 昵称
            let setName = document.querySelector('#set-name');
            // setSignature 签名
            let setSignature = document.querySelector('#set-signature');
            // gender 性别  是三个按钮的input
            let gender = document.querySelectorAll('#gender');
            // setPic 头像
            let setPic = document.querySelector('.pic').querySelector('img');
            // save 修改后保存信息
            let save = document.querySelector('.save')
            // sex 设置后的性别
            let sex;
            let flag = false;
            // 先存入未修改前的信息
            setName.value = obj.profile.nickname;
            setSignature.value = obj.profile.signature;
            setPic.src = obj.profile.avatarUrl;
            // 判断用户性别
            sex = obj.profile.gender;
            if (sex == 1) {
                gender[0].click();
            } else if (sex == 2) {
                gender[1].click();
            } else {
                gender[2].click();
            }
            // 点击可更改性别
            gender[0].addEventListener('click', function() {
                sex = 1;
            })

            gender[1].addEventListener('click', function() {
                sex = 2;
            })

            gender[2].addEventListener('click', function() {
                sex = 0;
            })
            // 修改昵称
            setName.addEventListener('input', function() {
                flag = setName.value === obj.profile.nickname ? false : true;
            })
            // 修改签名
            setSignature.addEventListener('input', function() {
                flag = setSignature.value === obj.profile.signature? false : true;
            })


            // 点击保存
            save.addEventListener('click', function() {
                // 没有修改时，直接跳转到主页面
                if (sex == obj.profile.gender && !flag) {
                    alert('没有修改任何信息！')
                    location.href = `index.html?userId=${getParam(location.href,'userId')}&cookie=${getParam(location.href,'cookie')}`;
                }
                // 若有修改信息，调用接口设置
                originAjax ({
                    url: 'https://autumnfish.cn/user/update',
                    data: {
                        // 注意，需要传入cookie
                        cookie: getParam(location.href, 'cookie'),
                        gender: sex,
                        birthday: obj.profile.birthday,
                        nickname: setName.value,
                        province: obj.profile.province,
                        city: obj.profile.city,
                        signature: setSignature.value
                    },
                    // 成功后跳转都主页面
                    success: function(obj) {
                        location.href = `index.html?userId=${getParam(location.href,'userId')}&cookie=${getParam(location.href,'cookie')}`;
                    },
                    // 失败时，显示失败信息，可能原因是昵称被占用
                    error: function(obj) {
                        alert(obj.message);
                    }
                })  
            })
        })
    })
    // 跳转到此页面默认为设置基本信息页面
    setUl.children[0].click();
    // 点击可到绑定设置，但还没有做好
    setUl.children[1].addEventListener('click', function () {
        set.innerHTML = bindSet.innerHTML;
    })

})