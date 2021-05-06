window.addEventListener('load', function () {

    //  song_play  点击该按钮可实现播放歌曲
    let song_play = document.querySelectorAll('#songPlay');
    // audio 获取音频元素
    let audio = document.querySelector('audio');
    // hid_play 获取最下面播放按钮， 可控制播放或暂停
    const hid_play = document.querySelector('#hid-play');
    // hid_flag  控制按钮暂停或播放
    let hid_flag = true;
    // hid_songName 将获取的歌名记录下来
    let hid_songName = document.querySelector('.hid-songname');
    // songName 获取歌曲的名字
    let songName = document.querySelectorAll('.songname')
    // processTime  进度条 
    let processTime = document.querySelector('.processtime');
    // barTime  获取进度条的元素
    let barTime = document.querySelector('.bar');
    //  processCircle 进度条上的小圆点
    let processCircle = document.querySelector('.processcircle');
    //  barTimeWidth 获取进度条总的长度
    const barTimeWidth = barTime.offsetWidth;
    //  play_timer  定时器
    let play_timer = null;
    // songNowTime  将歌曲目前的播放时间放在该元素上
    let songNowTime = document.querySelector('.now-time');
    // songSumTime  将歌曲总的播放时间放在该元素上
    let songSumTime = document.querySelector('.sum-time');



    // processCircle.addEventListener('click', function() {
    //     alert(111);
    // })



    // 实现点击播放歌曲
    for (let i = 0; i < song_play.length; i++) {

        song_play[i].addEventListener('click', function () {
            if (songName[i]) {
                let str = songName[i].innerHTML;
                hid_songName.innerHTML = str;
            }
            let song_id = getSongId(this);
            audio.src = 'https://music.163.com/song/media/outer/url?id=' + song_id + '';
            audio.play();
            hid_flag = true;
            hid_play.click();
        })
    }

    // 点击播放按钮实现播放与暂停
    hid_play.addEventListener('click', function () {
        if (hid_flag) {   // 播放歌曲
            this.style.background = 'url(imgs/playbar.png) no-repeat 0 -165px';
            audio.play();
            play_timer = setInterval(progressTime, 1000);
            hid_flag = false;
        } else {   // 暂停歌曲
            this.style.background = 'url(imgs/playbar.png) no-repeat 0 -204px';
            audio.pause();
            clearInterval(play_timer);   // 关闭定时器
            play_timer = null;
            hid_flag = true;
        }
    })

    // 拖动进度条改变歌曲播放时间
    processCircle.addEventListener('mousedown', function () {
        document.addEventListener('mousemove', move)
        function move(e) {
            processCircle.style.left = e.clientX - barTime.offsetLeft + 'px';
            processTime.style.width = e.clientX - barTime.offsetLeft + 'px';
            audio.pause();  // 进度条拖动时先暂停歌曲
            progressTimeByMouse();
        }
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mousedown', move);
            audio.play();  // 进度条拖动结束时再播放歌曲
        })
        hid_flag = true;
        hid_play.click()
    })

    barTime.addEventListener('click', function (e) {
        // processCircle.mousedown();
        // audio.play();  // 不加此行代码会报错
        processCircle.style.left = e.clientX - barTime.offsetLeft + 'px';
        processTime.style.width = e.clientX - barTime.offsetLeft + 'px';
        progressTimeByMouse();
        hid_flag = true;
        hid_play.click()
    })






    // 手动获取歌曲Id 并进行兼容性处理
    function getSongId(obj) {
        if (obj.dataset.songid) {  // 此方法自定义属性必须 写成小写的形式  html中不用
            return obj.dataset.songid
        } else {
            return obj.getAttribute("data-songId");
        }
    }

    // 根据歌曲播放时间获取进度条的位置
    function progressTime() {
        let song_currentTime = audio.currentTime;
        let song_totalTime = audio.duration;

        let processTimeWidth = Math.round(song_currentTime * barTimeWidth / song_totalTime);
        processTime.style.width = processTimeWidth + 'px';
        processCircle.style.left = processTimeWidth - 5 + 'px';
        //     console.log(song_currentTime);
        // console.log(song_totalTime);
        songNowTime.innerHTML = audio.currentTime;
    }

    // 根据进度条位置设置播放时间
    function progressTimeByMouse() {
        let processTimeWidth = processTime.offsetWidth;
        let song_totalTime = audio.duration;
        audio.currentTime = processTimeWidth * song_totalTime / barTimeWidth;
    }



    // 手机号登录
    // let user_phone = document.querySelector('#user-phone');
    // let user_password = document.querySelector('#user-password');
    // let user_submit = document.querySelector('.phone-submit');


    // user_submit.addEventListener('click', function() {
    //     console.log(user_password.value);
    // })

    // user_submit.addEventListener('click', function() {
    //     originAjax({
    //         type: 'get',
    //         url: 'https://autumnfish.cn/login/cellphone?phone='+ user_phone.value +'&password='+ user_password.value +'',
    //         success: function() {

    //         },
    //         error: function(obj) {
    //             if(obj.code != 200) {
    //                 alert('密码错误')
    //             }
    //         }
    //     });




    // })


    // 手机登录框部分
    let loadByPhone = document.querySelector("#loadByPhone");
    let user_close = document.querySelectorAll('.load-close');

    console.log(user_close);
    for (let i = 0; i < user_close.length; i++) {
        user_close[i].addEventListener('click', function () {
            this.parentNode.parentNode.style.display = 'none';
        })
    }
    // console.log(loadByPhone.contentWindow);
    // var iwindow = loadByPhone.contentWindow;
    // console.log('window', loadByPhone.contentWindow);
    // loadByPhone.style.width = 530 + 'px';
    // loadByPhone.style.height = 345 + 'px';

    // loadByPhone.style.width = window.innerWidth + 'px';
    // loadByPhone.style.height = window.innerHeight + 'px';




    // 热门推荐歌单部分调用接口实现

    const hotPlaylists = document.querySelector('.hot-song-ul');

    originAjax({
        url: 'https://autumnfish.cn/personalized',
        data: {
            limit: 8,
        },
        success: function (obj) {
            let playlists = obj.result;
            console.log(playlists);
            for (let i = 0; i < 8; i++) {
                hotPlaylists.children[i].setAttribute('playlistId', playlists[i].id)
                hotPlaylists.children[i].querySelector('img').src = playlists[i].picUrl;
                hotPlaylists.children[i].querySelector('p').querySelector('a').innerHTML = playlists[i].name;
            }
        }

    })

    // 飙升榜歌单获取
    const hotSongPlaylist = document.querySelector('.hotsong-playlist-ul');

    originAjax({
        url: 'https://autumnfish.cn/top/list',
        data: {
            id: 19723756
        },
        success: function (obj) {
            let playlist = obj.playlist;
            console.log(playlist);
            for (let i = 0; i < 10; i++) {
                hotSongPlaylist.children[i].querySelector('em').querySelector('a').innerHTML = playlist.tracks[i].name;
                hotSongPlaylist.children[i].querySelector('#songPlay').setAttribute('data-songId', playlist.tracks[i].id);
            }
        }

    })

    // 新歌榜榜歌单获取
    const newSongPlaylist = document.querySelector('.newsong-playlist-ul');

    originAjax({
        url: 'https://autumnfish.cn/top/list',
        data: {
            id: 3779629
        },
        success: function (obj) {
            let playlist = obj.playlist;
            for (let i = 0; i < 10; i++) {
                newSongPlaylist.children[i].querySelector('em').querySelector('a').innerHTML = playlist.tracks[i].name;
                newSongPlaylist.children[i].querySelector('#songPlay').setAttribute('data-songId', playlist.tracks[i].id);
            }
        }

    })


      // 原创榜榜歌单获取
    const originSongPlaylist = document.querySelector('.originsong-playlist-ul');

    originAjax({
        url: 'https://autumnfish.cn/top/list',
        data: {
            id: 2884035
        },
        success: function (obj) {
            let playlist = obj.playlist;
            for (let i = 0; i < 10; i++) {
                originSongPlaylist.children[i].querySelector('em').querySelector('a').innerHTML = playlist.tracks[i].name;
                originSongPlaylist.children[i].querySelector('#songPlay').setAttribute('data-songId', playlist.tracks[i].id);
            }
        }

    })



    




























})


