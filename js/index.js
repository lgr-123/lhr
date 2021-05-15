window.addEventListener('load', function () {

    // k,historySong[] 用来存放歌曲播放的id
    var k = 0;
    var m = 0;
    var historySong = [];

    // open_load nav上的登录按钮
    let open_load = document.querySelector('.open-load');
    let user_inf = document.querySelector('#user-inf');
    let user_personinf = document.querySelector('.user-personinf');
    // let user_personinf = document.querySelector('.user-personinf');
    let user_loadifn = document.querySelector('.user-hid');
    let user_unload = document.querySelector('.unload');
    let hid_content = document.getElementById('hid-content');

    if (getParam(location.href, 'userId')) {
        user_unload.style.display = 'none';
        user_loadifn.style.display = 'block';
        let promise = new Promise((resolve, reject) => {
            originAjax({
                url: 'https://autumnfish.cn/user/detail',
                data: {
                    uid: getParam(location.href, 'userId')
                },
                success: function (obj) {
                    open_load.innerHTML = `<img src="${obj.profile.avatarUrl}">${hid_content.innerHTML}`;


                    let user_detail = document.querySelector('#user-detail-ul');

                    user_inf.style.width = 250 + 'px';
                    user_inf.style.height = 185 + 'px';

                    user_personinf.querySelector('img').src = obj.profile.avatarUrl;
                    user_personinf.querySelector('p').innerHTML = obj.profile.nickname;
                    user_personinf.querySelector('span').innerHTML = 'lv.' + obj.level;
                    user_detail.children[0].querySelector('p').innerHTML = obj.profile.eventCount;
                    user_detail.children[1].querySelector('p').innerHTML = obj.profile.follows;
                    user_detail.children[2].querySelector('p').innerHTML = obj.profile.followeds;
                    resolve();
                }

            })
        })

        promise.then(() => {
            // hid_userInf 当用户登录后才会显示的一些设置
            let hid_userInf = document.querySelector('.hid-userinf');
            // userInf 用户主页
            let userInf = document.querySelector('.userinf');
            // quitLoad 用户退出登录
            let quitLoad = document.querySelector('.quitload');
            // userSet 用户个人设置
            let userSet = document.querySelector('.userset');

            // 鼠标经过时显示用户设置
            open_load.addEventListener('mouseover', function () {
                hid_userInf.style.display = 'block';
            })

            // 鼠标不经过时隐藏用户设置
            open_load.addEventListener('mouseout', function () {
                hid_userInf.style.display = 'none';
            })

            // 点击个人主页跳转到用户页面
            userInf.addEventListener('click', function () {
                location.href = 'user.html?userId=' + getParam(location.href, 'userId');
            })

            // 点击退出登录
            quitLoad.addEventListener('click', function() {
                originAjax({
                    url: 'https://autumnfish.cn/logout',
                    data: {
                        cookie: getParam(location.href, 'cookie')
                    },
                    success: function(obj) {
                        location.href = 'index.html';
                    }
                })
            })

            userSet.addEventListener('click', function() {
                location.href = `userset.html?userId=${getParam(location.href, 'userId')}&cookie=${getParam(location.href, 'cookie')}`;
            })


        })



      


    }
    open_load.addEventListener('click', function () {
        if (!getParam(location.href, 'userId')) {
            location.href = 'phonenumberLoad.html'
        }
    })














    playByA = function (songId) {
        audio.setAttribute('songId', songId);
        hid_songName.href = 'songs.html?songId=' + songId + '';
        m = k;
        historySong[k++] = songId;
        clearTimeout(play_timer);
        play_timer = setTimeout(function () {
            audio.src = `https://music.163.com/song/media/outer/url?id=${songId}`;
            audio.play();

            originAjax({
                url: 'https://autumnfish.cn/song/detail',
                data: {
                    ids: songId
                },
                success: function (obj) {
                    console.log(obj);
                    let song = obj.songs;
                    let str = song[0].ar[0].name;
                    hid_songName.innerHTML = song[0].name;
                    hid_songPicture.src = song[0].al.picUrl;
                    if (song[0].ar.length > 1) {
                        str = '';
                        for (let i = 0; i < song[0].ar.length; i++) {
                            str += `/${song[0].ar[i].name}`
                        }
                    }
                    hid_singerName.innerHTML = str
                    hid_flag = true;
                    hid_play.click();
                }

            })
        }, 600);

    }
    //             hid_songName.innerHTML = str;


    // 3、3个榜单调用接口获取歌曲 开始
    // 飙升榜歌单获取
    const hotSongPlaylist = document.querySelector('.hotsong-playlist-ul');

    originAjax({
        url: 'https://autumnfish.cn/top/list',
        data: {
            id: 19723756
        },
        success: function (obj) {
            let playlist = obj.playlist;
            // console.log(playlist);
            let str = '';
            let str1 = '';
            let str2 = '<a href="javascript:;"></a><a href="javascript:;"></a>';
            let str3 = '';
            for (let i = 0, j = 1; i < 10; i++, j++) {
                str1 = `<span>${j}</span><em><a href="songs.html?songId=${playlist.tracks[i].id}" class="songname" songid="${playlist.tracks[i].id}">${playlist.tracks[i].name}</a></em>`
                str3 = `<div><a heref="javascript:;" id="songPlay" songid="${playlist.tracks[i].id}" onclick="playByA(${playlist.tracks[i].id})"</a>${str2}</div>`;
                str += `<li>${str1 + str3}</li>`;

            }
            hotSongPlaylist.innerHTML = str + `<li class="record-liLast"><a href="#">查看全部 &gt;</a></li>`;
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
            let str = '';
            let str1 = '';
            let str2 = '<a href="javascript:;"></a><a href="javascript:;"></a>';
            let str3 = '';
            for (let i = 0, j = 1; i < 10; i++, j++) {
                str1 = `<span>${j}</span><em><a href="songs.html?songId=${playlist.tracks[i].id}" class="songname" songid="${playlist.tracks[i].id}">${playlist.tracks[i].name}</a></em>`
                str3 = `<div><a heref="javascript:;" id="songPlay" songid="${playlist.tracks[i].id}" onclick="playByA(${playlist.tracks[i].id})"</a>${str2}</div>`;
                str += `<li>${str1 + str3}</li>`;

            }
            newSongPlaylist.innerHTML = str + `<li class="record-liLast"><a href="#">查看全部 &gt;</a></li>`;
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
            let str = '';
            let str1 = '';
            let str2 = '<a href="javascript:;"></a><a href="javascript:;"></a>';
            let str3 = '';
            for (let i = 0, j = 1; i < 10; i++, j++) {
                str1 = `<span>${j}</span><em><a href="songs.html?songId=${playlist.tracks[i].id}" class="songname" songid="${playlist.tracks[i].id}">${playlist.tracks[i].name}</a></em>`
                str3 = `<div><a heref="javascript:;" id="songPlay" songid="${playlist.tracks[i].id}" onclick="playByA(${playlist.tracks[i].id})"</a>${str2}</div>`;
                str += `<li>${str1 + str3}</li>`;
            }
            originSongPlaylist.innerHTML = str + `<li class="record-liLast"><a href="#">查看全部 &gt;</a></li>`;

        }

    })

    // 3、3个榜单调用接口获取歌曲 结束




    // songName 获取歌曲的名字
    let songName = document.querySelectorAll('.songname')
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
    // hid_singerName 隐藏的播放条上的歌手名字
    let hid_singerName = document.querySelector(".hid-singername")
    // hid_songPicture  隐藏的播放条的歌曲封面
    let hid_songPicture = document.querySelector('.hid-songpicture');
    // volumeCircle  音量条上的小点
    let volumeCircle = document.querySelector('.circlevolume');
    // sumVolume总的音量条长度
    let sumVolume = document.querySelector('.sumvolume');
    // realVolume总的音量条长度
    let realVolume = document.querySelector('.realvolume');


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



    let musicSet = this.document.querySelector('.play-hid');
    console.log(musicSet.offsetTop);
    // 调整歌曲音量
    volumeCircle.addEventListener('mousedown', function () {

        document.addEventListener('mousemove', move);
        function move(e) {
            if (e.clientY - musicSet.offsetTop >= sumVolume.offsetTop && e.clientY - musicSet.offsetTopt > 15) {
                volumeCircle.style.top = e.clientY - musicSet.offsetTop + 'px';
                realVolume.style.height = -e.clientY + musicSet.offsetTop + 'px';
                console.log(volumeCircle.offsetTop);
            }

            // if (e.clientY - musicSet.offsetTop < sumVolume.offsetTop || realVolume.offsetHeight <= 0) {
            //     return 
            //     document.removeEventListener('mousemove', move);

            // }
        }
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mousedown', move);
            // audio.play();  // 进度条拖动结束时再播放歌曲
        })
    })




    // 根据歌曲播放时间获取进度条的位置
    function progressTime() {
        let song_currentTime = audio.currentTime;
        let song_totalTime = audio.duration;

        let processTimeWidth = Math.round(song_currentTime * barTimeWidth / song_totalTime);
        processTime.style.width = processTimeWidth + 'px';
        processCircle.style.left = processTimeWidth - 5 + 'px';
        //     console.log(song_currentTime);
        // console.log(song_totalTime);
        songNowTime.innerHTML = setTime(audio.currentTime);
        songSumTime.innerHTML = setTime(audio.duration);
    }

    // 根据进度条位置设置播放时间
    function progressTimeByMouse() {
        let processTimeWidth = processTime.offsetWidth;
        let song_totalTime = audio.duration;
        audio.currentTime = processTimeWidth * song_totalTime / barTimeWidth;
    }

    // 切换上一首歌播放
    let play_left = document.querySelector('#play-left');
    let play_right = document.querySelector('#play-right');
    // 加定时器，防止点击过多时连续调用接口 

    play_left.addEventListener('click', function () {
        if (m == 0) {
            m = k;
        }
        m--;
        clearTimeout(play_timer);
        play_timer = setTimeout(function () {
            let promise = new Promise((resolve, reject) => {
                originAjax({
                    url: 'https://autumnfish.cn/check/music',
                    data: {
                        id: historySong[m]
                    },
                    success: function (obj) {
                        resolve(obj);
                        console.log(obj);
                    }
                })

            })
            promise.then((obj) => {
                console.log(obj.success);
                if (obj.success) {
                    audio.src = `https://music.163.com/song/media/outer/url?id=${historySong[m]}`;
                    audio.play();
                    originAjax({
                        url: 'https://autumnfish.cn/song/detail',
                        data: {
                            ids: historySong[m]
                        },
                        success: function (obj) {
                            // console.log(obj);
                            let song = obj.songs;
                            let str = song[0].ar[0].name;
                            hid_songName.innerHTML = song[0].name;
                            hid_songPicture.src = song[0].al.picUrl;
                            if (song[0].ar.length > 1) {
                                str = '';
                                for (let i = 0; i < song[0].ar.length; i++) {
                                    str += `/${song[0].ar[i].name}`
                                }
                            }
                            hid_singerName.innerHTML = str;
                            hid_flag = true;
                            hid_play.click();
                        }

                    })
                } else {
                    alert('该歌曲不能播放，已为你播放下一首');
                    hid_flag = true;
                    hid_play.click();
                    play_right.click();

                }


            })


        }, 800)

    })

    play_right.addEventListener('click', function () {
        if (m == k - 1) {
            m = -1;
        }
        m++;
        clearTimeout(play_timer);
        play_timer = setTimeout(function () {
            audio.src = `https://music.163.com/song/media/outer/url?id=${historySong[m]}`;
            // console.log(audio.networkState);
            //    console.log(audio);
            originAjax({
                url: 'https://autumnfish.cn/song/detail',
                data: {
                    ids: historySong[m]
                },
                success: function (obj) {
                    // console.log(obj);
                    let song = obj.songs;
                    let str = song[0].ar[0].name;
                    hid_songName.innerHTML = song[0].name;
                    hid_songPicture.src = song[0].al.picUrl;
                    if (song[0].ar.length > 1) {
                        str = '';
                        for (let i = 0; i < song[0].ar.length; i++) {
                            str += `/${song[0].ar[i].name}`
                        }
                    }
                    hid_singerName.innerHTML = str;
                    hid_flag = true;
                    hid_play.click();
                }

            })


        }, 800)


    })

    audio.addEventListener('ended', function () {
        hid_flag = true;
        hid_play.click();
        play_right.click();
    })


    // 1、原界面歌曲播放部分结束





    // 1、原界面歌曲播放部分开始



    // processCircle.addEventListener('click', function() {
    //     alert(111);
    // })






    audio.addEventListener('ended', function () {
        hid_flag = true;
        hid_play.click();
        play_right.click();
    })


    // 1、原界面歌曲播放部分结束







    //2、 热门推荐歌单部分调用接口实现 开始

    const hotPlaylists = document.querySelector('.hot-song-ul');

    originAjax({
        url: 'https://autumnfish.cn/personalized',
        data: {
            limit: 8,
        },
        success: function (obj) {
            console.log(obj);
            let playlists = obj.result;
            // console.log(playlists);
            for (let i = 0; i < 8; i++) {
                hotPlaylists.children[i].querySelector('.float').querySelector('a').setAttribute('playlistId', playlists[i].id)
                hotPlaylists.children[i].querySelector('img').src = playlists[i].picUrl;
                hotPlaylists.children[i].querySelector('p').querySelector('a').innerHTML = playlists[i].name;
            }
        }

    })

    for (let i = 0; i < hotPlaylists.children.length; i++) {
        hotPlaylists.children[i].querySelector('.float').querySelector('a').addEventListener('click', function () {
            let playlist = hotPlaylists.children[i].querySelector('.float').querySelector('a').getAttribute('playlistId');
            originAjax({
                url: 'https://autumnfish.cn/playlist/detail',
                data: {
                    id: playlist
                },
                success: function (obj) {
                    // console.log(obj);
                    let songs = obj.playlist.trackIds;
                    // console.log(songs);
                    k = m = 0;
                    for (let j = 0; j < songs.length; j++) {
                        historySong[k++] = songs[j].id;
                    }
                    hid_flag = true;
                    hid_play.click();
                    play_right.click();
                }
            })
        })

    }

    //2、 热门推荐歌单部分调用接口实现 结束








    //5、 搜索功能实现 开始


    let search_input = document.getElementById('search-input');
    let search_content = document.querySelector('.search-hid');
    let relate_song = document.getElementById('relate-song');
    let relate_singer = document.getElementById('relate-singer');
    let relate_album = document.getElementById('relate-ablum');
    let relate_playlists = document.getElementById('relate-playlists');
    let relate_user = document.getElementById('relate-user');
    let search_timer = null;

    search_input.addEventListener('input', function () {
        let key = this.value;
        clearTimeout(search_timer);
        // key.trim()去掉用户输入内容两边的空格
        if (key.trim().length == 0) {
            search_content.style.display = 'none';
        } else {
            search_content.style.display = 'block';
            relate_user.innerHTML = key;
            search_timer = setTimeout(function () {
                originAjax({
                    type: 'get',
                    url: 'https://autumnfish.cn/search/suggest',
                    data: {
                        keywords: key
                    },
                    success: function (obj) {

                        let result = obj.result;
                        console.log(result);
                        relate_song.innerHTML = '';  // 先清除之前的内容
                        if (result.songs) {
                            for (let i = 0; i < result.songs.length; i++) {
                                let li = document.createElement('li');
                                li.innerHTML = result.songs[i].name;
                                li.setAttribute('songId', result.songs[i].id)
                                relate_song.appendChild(li);
                            }
                        }

                        relate_singer.innerHTML = '';
                        if (result.artists) {
                            for (let i = 0; i < result.artists.length; i++) {
                                let li = document.createElement('li');
                                li.innerHTML = result.artists[i].name;
                                relate_singer.appendChild(li);
                            }
                        }

                        relate_album.innerHTML = '';
                        if (result.albums) {
                            for (let i = 0; i < result.albums.length; i++) {
                                let li = document.createElement('li');
                                li.innerHTML = result.albums[i].name;
                                relate_album.appendChild(li);
                            }
                        }

                        relate_playlists.innerHTML = '';
                        if (result.playlists) {
                            for (let i = 0; i < result.playlists.length; i++) {
                                let li = document.createElement('li');
                                li.innerHTML = result.playlists[i].name;
                                relate_playlists.appendChild(li);
                            }
                        }
                    }
                })
            }, 500)

        }

        search_input.addEventListener('blur', function () {
            search_content.style.display = 'none';
        })

        search_input.addEventListener('focus', function () {
            if (this.value != '') {
                search_content.style.display = 'block';

            }
        })
        // console.log(relate_song.children.length);
        //     for (let i = 0; i < relate_song.children.length; i++) {
        //         relate_song.children[i].addEventListener('click', function () {
        //             audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.getAttribute('songid');
        //             alert(11);
        //             audio.play();
        //         })
        // }
    })

    // 在搜索框中按下回车键跳转到搜索界面
    search_input.addEventListener('keyup', function (e) {
        if (e.code == 'NumpadEnter') {
            setTimeout(function () {
                location.href = 'search.html?keywords=' + search_input.value + '&type=1';

            }, 200);
        }
    })

    search_input.addEventListener('focus', function () {
        console.log(relate_song.children[2]);
        for (let i = 0; i < relate_song.children.length; i++) {
            relate_song.children[i].addEventListener('click', function () {
                audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.getAttribute('songid');
                alert(11);
                audio.play();
            })
        }
    })



    //5、 搜索功能实现 结束

    // originAjax({

    //     url: 'https://autumnfish.cn/playmode/intelligence/list?id=33894312&pid=24381616',
    //     data: {
    //         cookie: "NMTID=00OY5j6GvL3GmDo7kJ1gilJtw0cqPAAAAF5ZZP2-A; Max-Age=315360000; Expires=Sun, 11 May 2031 11:54:26 GMT; Path=/;;MUSIC_U=da179c45ec98473d26c53698f18b5ce22a5975098a565bb22cf36f98b4f4346ed106471d18c1d4a4; Max-Age=1296000; Expires=Fri, 28 May 2021 11:54:26 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Fri, 28 May 2021 11:54:26 GMT; Path=/;;__csrf=c96bd3c1ed720800e18b056a81dd3329; Max-Age=1296010; Expires=Fri, 28 May 2021 11:54:36 GMT; Path=/;"
    //     },
    //     success: function(obj) {
    //         // console.log(obj);
    //     }

    // })


})



// https://music.163.com/song/media/outer/url?id=1466033420























