window.addEventListener('load', function () {


    let song_picture = document.querySelector('.song-picture');
    let song_name = document.querySelector('.songName');
    let singer_name = document.querySelector('.singerName');
    let song_lyric = document.querySelector('.lyric');

    originAjax({
        url: 'https://autumnfish.cn/lyric',
        data: {
            id: 29004400
        },
        success: function (obj) {
            console.log(obj);
            getLyric(obj.lrc.lyric);
        }
    })

    originAjax({
        url: 'https://autumnfish.cn/song/detail',
        data: {
            ids: 29004400
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

    function getLyric(obj) {
        let str = obj.split('[');
        str.forEach(element => {
            let h = element.split(']');
            // 秒后面两位
            songLyric = h[1];
            let q = h[0].split('.');
            let n = q[0].split(':');
            // let t = n[0] * 60 + parseInt(n[1]) + parseInt(q[1]/100)/10;
           let t = n[0] * 60 + parseInt(n[1]);
            // console.log(t);
            // console.log(q[1]);
            // console.log(n);
            // console.log(h);
            console.log(songLyric);
            // if (songLyric == 'OP: Denseline Co,Limited(Warner/Chappell Music H.K.Ltd).'
            // || songLyric == 'SP: Warner/Chappell Music Publishing Agency(Beijing)Ltd.'
            // || songLyric == 'OP: HIM Music Publishing Inc.(Admin By,EMI MPT)'
            // || songLyric == 'SP: 百代音乐版权代理(北京)有限公司(EMI Music Publishing China)'
            // || songLyric == 'ISRC CN-D14-14-00063') {
            //     songLyric = '';

            // }
            if (songLyric == "OP: Denseline Co,Limited(Warner/Chappell Music H.K.Ltd).") {
            songLyric = '';
            alert(11);
            }
            // if (songLyric.indexOf('没人发现它存在')) {
            //     songLyric = '';
            //     alert(11);
            //     console.log(11);
            //     }
            if (songLyric) {
                songStr += '<p id="time'+t+'">' + songLyric + '<p>';
            }

        });
        song_lyric.innerHTML = songStr;
    }


    // 播放歌曲功能
    let musicPlay = document.querySelector('#music-play');
    let btnPlay = document.querySelector('#btnPlay');
    let isPlay = true;



    btnPlay.addEventListener('click', function () {
        if (isPlay) {
            musicPlay.play();
            let style = document.createElement('style');
            let text = document.createTextNode(`.content .music-icon .music-set .music-play a:nth-child(2)::before{content: "\\ea1d" }`);
            style.appendChild(text);
            document.body.appendChild(style);
            isPlay = false;
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
    musicPlay.addEventListener('timeupdate', function () {
        // let curTime = parseInt(this.currentTime * 10);
        // curTime /= 10;
        let curTime = parseInt(this.currentTime);
        // console.log(curTime);
        // console.log(this.currentTime);
        if(document.querySelector('#time' + curTime)) {
            document.querySelector('#time' + flag).style.color = '#ccc';
            flag = curTime;
            document.querySelector('#time' + curTime).style.color = 'red';
        }
    }, false)






})