window.addEventListener('load', function () {

    let set = document.querySelector('.base-set');
    let baseSet = document.querySelector('#base-set');
    let setUl = document.querySelector('.set-ul');
    let bindSet = document.querySelector('#bind-set');

    setUl.children[0].click();


    setUl.children[0].addEventListener('click', function () {
        let promise1 = new Promise((resolve, reject) => {
            set.innerHTML = baseSet.innerHTML;
           
            originAjax({
                url: 'https://autumnfish.cn/user/account',
                data: {
                    cookie: getParam(location.href, 'cookie'),
                    num: Math.random
                },
                success: function (obj) {
                    // console.log(obj);
                    resolve(obj);
                }
            })
        })

        promise1.then((obj) => {
            console.log(obj);
            let setName = document.querySelector('#set-name');
            let setSignature = document.querySelector('#set-signature');
            let gender = document.querySelectorAll('#gender');
            let setPic = document.querySelector('.pic').querySelector('img');
            let save = document.querySelector('.save')
            // gender性别
            let sex;
            let flag = false;
            setName.value = obj.profile.nickname;
            setSignature.value = obj.profile.signature;
            setPic.src = obj.profile.avatarUrl;
            sex = obj.profile.gender;
            if (sex == 1) {
                gender[0].click();
            } else if (sex == 2) {
                gender[1].click();
            } else {
                gender[2].click();
            }

            gender[0].addEventListener('click', function() {
                sex = 1;
            })

            gender[1].addEventListener('click', function() {
                sex = 2;
            })

            gender[2].addEventListener('click', function() {
                sex = 0;
            })

            setName.addEventListener('input', function() {
                flag = setName.value === obj.profile.nickname ? false : true;
            })

            setSignature.addEventListener('input', function() {
                flag = setSignature.value === obj.profile.signature? false : true;
            })



            save.addEventListener('click', function() {
                // 没有修改时，直接跳转到主页面
                if (sex == obj.profile.gender && !flag) {
                    alert('没有修改任何信息！')
                    location.href = `index.html?userId=${getParam(location.href,'userId')}&cookie=${getParam(location.href,'cookie')}`;
                }
                originAjax ({
                    url: 'https://autumnfish.cn/user/update',
                    data: {
                        cookie: getParam(location.href, 'cookie'),
                        gender: sex,
                        birthday: obj.profile.birthday,
                        nickname: setName.value,
                        province: obj.profile.province,
                        city: obj.profile.city,
                        signature: setSignature.value
                    },
                    success: function(obj) {
                        location.href = `index.html?userId=${getParam(location.href,'userId')}&cookie=${getParam(location.href,'cookie')}`;
                    },
                    error: function(obj) {
                        alert(obj.message);
                    }
                })

                
            })




        })


    })

    setUl.children[1].addEventListener('click', function () {
        set.innerHTML = bindSet.innerHTML;
    })


// originAjax({
//     url: 'https://autumnfish.cn/setting',
//     data: {
//         cookie: getParam(location.href, 'cookie'),
//     },
//     success: function(obj) {
//         console.log(obj);
//     }
// })




})