window.addEventListener('load', function () {


    let song_picture = document.querySelector('.song-picture');
    let song_name = document.querySelector('.songName');
    let singer_name = document.querySelector('.singerName');
    let song_lyric = document.querySelector('.lyric');
    let musicPlay = document.querySelector('audio');
    // let hid_songName = document.querySelector('.hid-songname');
    // 获取歌曲id
   
    // console.log(hid_songName);
    musicPlay.src = 'https://music.163.com/song/media/outer/url?id=' + getParam(location.href, 'songId');
   
        originAjax({
            url: 'https://autumnfish.cn/lyric',
            data: {
                id: getParam(location.href, 'songId')
            },
            success: function (obj) {
                console.log(obj);
                getLyric(obj.lrc.lyric);
            }
        })
    
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
        // 判断歌词是否存在，存在时才进行分割
            if(g[1]) {  
                let q = g[1].split('.');
                // console.log(q[0]);
                let n = q[0].split(':');
                //  console.log(n);
                //   let t = n[0] * 60 + parseInt(n[1]) + parseInt(q[1]/100)/10;
            let t = n[0] * 60 + parseInt(n[1]);
            // console.log(t);

            if (songLyric == 'OP: Denseline Co,Limited(Warner/Chappell Music H.K.Ltd).'
            || songLyric == 'SP: Warner/Chappell Music Publishing Agency(Beijing)Ltd.'
            || songLyric == 'OP: HIM Music Publishing Inc.(Admin By,EMI MPT)'
            || songLyric == 'SP: 百代音乐版权代理(北京)有限公司(EMI Music Publishing China)'
            || songLyric == 'ISRC CN-D14-14-00063') {
            songLyric = '';
        }
       
        if (songLyric) {
            // songStr += '<p id="time' + t + '">' + songLyric + '<p>';
            songStr += '<p id="time'+ t +'">' + songLyric + '<p>';
        }
            }
           

   
           
           
           
            // console.log(t);
            // console.log(q[1]);
            // console.log(n);
            // console.log(h);
            // console.log(songLyric);
         

        });
        song_lyric.innerHTML = songStr;
    }


    // 播放歌曲功能
   
    let btnPlay = document.querySelector('#btnPlay');
    let isPlay = true;
    let totalTime = document.querySelector('.total-time');
    let nowTime = document.querySelector('.now-time');

    btnPlay.addEventListener('click', function () {
        if (isPlay) {
            musicPlay.play();
            let style = document.createElement('style');
            let text = document.createTextNode(`.content .music-icon .music-set .music-play a:nth-child(2)::before{content: "\\ea1d" }`);
            style.appendChild(text);
            document.body.appendChild(style);
            isPlay = false;
            console.log(musicPlay.duration);
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
    let lyric_div = document.querySelector('.lyric');

    console.log(lyric_div);
    lyric_div.scrollTop = 50;
    console.log(lyric_div.scrollTop);

    setInterval(function() {
        musicPlay.addEventListener('timeupdate', function () {
            nowTime.innerHTML = setTime(this.currentTime);
            // let curTime = parseInt(this.currentTime * 10);
            // curTime /= 10;
            let curTime = parseInt(this.currentTime);
            // console.log(curTime);
            // console.log(this.currentTime);
    
            if (document.querySelector('#time' + curTime)) {
               
                document.querySelector('#time' + flag).style.color = '#ccc';
                flag = curTime;
                document.querySelector('#time' + curTime).style.color = 'red';
                if (document.querySelector('#time' + curTime).offsetTop >= lyric_div.offsetHeight / 2) {
               
                            // console.log(document.querySelector('#time' + curTime).offsetHeight);
                            lyric_div.scrollTop = document.querySelector('#time' + curTime).offsetTop - 2/5 * lyric_div.offsetHeight;
                            
                        }
            }
           
            // if (document.querySelector('#time' + curTime).offsetTop) {
            //     if (document.querySelector('#time' + curTime).offsetTop >= lyric_div.offsetHeight / 2) {
               
            //         // console.log(document.querySelector('#time' + curTime).offsetHeight);
            //         lyric_div.scrollTop = document.querySelector('#time' + curTime).offsetTop - 2/5 * lyric_div.offsetHeight;
                    
            //     }
            // }
            
        }, false)
    }, 1000)
   


  





})