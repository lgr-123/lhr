


window.addEventListener('load', function () {


    // song_picture 歌曲封面
    let song_picture = document.querySelector('.song-picture');
    // song_name 歌曲名字
    let song_name = document.querySelector('.songName');
    // singer_name  歌手名字
    let singer_name = document.querySelector('.singerName');
    // song_lyric 歌词部分
    let song_lyric = document.querySelector('.lyric');
    // musicPlay  audio音频
    let musicPlay = document.querySelector('audio');
    // let hid_songName = document.querySelector('.hid-songname');
    // 获取歌曲id

    // 将url上的歌曲id解析下来赋值给音频的src
    musicPlay.src = 'https://music.163.com/song/media/outer/url?id=' + getParam(location.href, 'songId');



    // 调用接口获取歌词
    originAjax({
        url: 'https://autumnfish.cn/lyric',
        data: {
            id: getParam(location.href, 'songId')
        },
        success: function (obj) {
            console.log(obj);
            // 调用函数，传入歌词数据
            getLyric(obj.lrc.lyric);
        }
    })

    // 调用接口获取歌曲的名字，歌手名字，歌曲封面等
    originAjax({
        url: 'https://autumnfish.cn/song/detail',
        data: {
            ids: getParam(location.href, 'songId')
        },
        success: function (obj) {
            // console.log(obj);
            let songs = obj.songs[0];
            song_picture.querySelector('img').src = songs.al.picUrl;
            song_name.innerHTML = songs.name;
            singer_name.innerHTML = songs.ar[0].name;
        }

    })


    let songStr = '';
    // 通过该函数获取到歌词，通过分割的方法获取到歌词
    function getLyric(obj) {
        // console.log(obj);
        let str = obj.split('\n');
        // console.log(str);
        str.forEach(element => {
            let h = element.split(']');
            // console.log(h);
            songLyric = h[1];
            let g = h[0].split('[');
            //    console.log(g[1]);
            // 判断歌词是否存在，存在时才进行时间的分割
            if (g[1]) {
                let q = g[1].split('.');
                // console.log(q[0]);
                let n = q[0].split(':');
                //  console.log(n);
                //   let t = n[0] * 60 + parseInt(n[1]) + parseInt(q[1]/100)/10;
                let t = n[0] * 60 + parseInt(n[1]);
                // console.log(t);
                // 将下面歌词去掉
                if (songLyric == 'OP: Denseline Co,Limited(Warner/Chappell Music H.K.Ltd).'
                    || songLyric == 'SP: Warner/Chappell Music Publishing Agency(Beijing)Ltd.'
                    || songLyric == 'OP: HIM Music Publishing Inc.(Admin By,EMI MPT)'
                    || songLyric == 'SP: 百代音乐版权代理(北京)有限公司(EMI Music Publishing China)'
                    || songLyric == 'ISRC CN-D14-14-00063') {
                    songLyric = '';
                }

                if (songLyric) {
                    // 拼接歌词
                    songStr += `<p id="time${t}">${songLyric}<p>`;
                }
            }
        });
        song_lyric.innerHTML = songStr;
    }


    // 播放歌曲功能
    // btnPlay 播放歌曲按钮
    let btnPlay = document.querySelector('#btnPlay');
    // isPlay 判断是否播放
    let isPlay = true;
    // totalTime 获取存放总时间的元素
    let totalTime = document.querySelector('.total-time');
    // nowTime 获取存放实时播放时间的元素
    let nowTime = document.querySelector('.now-time');
    // 点击播放或暂停
    btnPlay.addEventListener('click', function () {
        if (isPlay) {
            musicPlay.play();
            // 改变按钮形状
            let style = document.createElement('style');
            let text = document.createTextNode(`.content .music-icon .music-set .music-play a:nth-child(2)::before{content: "\\ea1d" }`);
            style.appendChild(text);
            document.body.appendChild(style);
            isPlay = false;
            console.log(musicPlay.duration);
            // 存放总时间
            totalTime.innerHTML = setTime(musicPlay.duration);
        } else {
            musicPlay.pause();
            let style = document.createElement('style');
            let text = document.createTextNode(`.content .music-icon .music-set .music-play a:nth-child(2)::before{content: "\\ea1c" }`);
            style.appendChild(text);
            document.body.appendChild(style);
            isPlay = true;
        }

    })


    // 歌词同步功能
    let flag = 0;
    // lyric_div 存放歌词的div
    let lyric_div = document.querySelector('.lyric');

    lyric_div.scrollTop = 50;
    console.log(lyric_div.scrollTop);

    setInterval(function () {
        musicPlay.addEventListener('timeupdate', function () {
            nowTime.innerHTML = setTime(this.currentTime);
            let curTime = parseInt(this.currentTime);
            // console.log(curTime);
            // console.log(this.currentTime);
            if (document.querySelector('#time' + curTime)) {
                document.querySelector('#time' + flag).style.color = '#ccc';
                flag = curTime;
                document.querySelector('#time' + curTime).style.color = 'red';
                if (document.querySelector('#time' + curTime).offsetTop >= lyric_div.offsetHeight / 2) {
                    // console.log(document.querySelector('#time' + curTime).offsetHeight);
                    lyric_div.scrollTop = document.querySelector('#time' + curTime).offsetTop - 2 / 5 * lyric_div.offsetHeight;
                }
            }
        }, false)
    }, 1000)









})