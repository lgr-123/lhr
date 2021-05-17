window.addEventListener('load', function () {

    //全局变量  k,historySong[] 用来存放歌曲播放的id
    var k = 0;
    var m = 0;
    var historySong = [];

    // 以下模块为判断用户是否登录，登录则显示响应内容
    // open_load nav上的登录按钮
    let open_load = document.querySelector('.open-load');
    // user_inf “下载客户端”下面的模块
    let user_inf = document.querySelector('#user-inf');
    // user_personinf 用户个人信息
    let user_personinf = document.querySelector('.user-personinf');
    // let user_personinf = document.querySelector('.user-personinf');
    let user_loadifn = document.querySelector('.user-hid');
    // user_unload 为未登录状态时“下载客户端”下面的模块
    let user_unload = document.querySelector('.unload');
    // hid_content 用script存储html代码，登录后加进去，鼠标经过用户头像会显示的内容
    let hid_content = document.getElementById('hid-content');


    // 判断url上是否有userId属性，有的话则为登录成功，没有则是没有登录
    if (getParam(location.href, 'userId')) {
        // 把没登录的模块隐藏
        user_unload.style.display = 'none';
        // 登录模块显示
        user_loadifn.style.display = 'block';
        // 利用promise，先调用api，获取用户的一些个人信息，放在登录成功的模块那
        let promise = new Promise((resolve, reject) => {
            originAjax({
                url: 'https://autumnfish.cn/user/detail',
                data: {
                    // getParam()封装的函数，用来获取url上面的一些参数和值，此处获取的是userid
                    uid: getParam(location.href, 'userId')
                },
                success: function (obj) {
                    // 调用成功时修改内容，将script脚本内容加进去
                    open_load.innerHTML = `<img src="${obj.profile.avatarUrl}">${hid_content.innerHTML}`;
                    let user_detail = document.querySelector('#user-detail-ul');
                    // 修改该模块宽高
                    user_inf.style.width = 250 + 'px';
                    user_inf.style.height = 185 + 'px';
                    user_personinf.querySelector('img').src = obj.profile.avatarUrl;
                    user_personinf.querySelector('p').innerHTML = obj.profile.nickname;
                    user_personinf.querySelector('span').innerHTML = 'lv.' + obj.level;
                    user_detail.children[0].querySelector('p').innerHTML = obj.profile.eventCount;
                    user_detail.children[1].querySelector('p').innerHTML = obj.profile.follows;
                    user_detail.children[2].querySelector('p').innerHTML = obj.profile.followeds;
                    // 上述执行完再执行resolve函数
                    resolve();
                }

            })
        })

        promise.then(() => {
            // 执行上述完成后再绑定动态生成的元素

            // hid_userInf 当用户登录后才会显示的一些设置
            let hid_userInf = document.querySelector('.hid-userinf');
            // userInf 用户主页
            let userInf = document.querySelector('.userinf');
            // quitLoad 用户退出登录
            let quitLoad = document.querySelector('.quitload');
            // userSet 用户个人设置
            let userSet = document.querySelector('.userset');

            // 鼠标经过用户头像时显示用户设置
            open_load.addEventListener('mouseover', function () {
                hid_userInf.style.display = 'block';
            })

            // 鼠标不经过用户头像时隐藏用户设置
            open_load.addEventListener('mouseout', function () {
                hid_userInf.style.display = 'none';
            })

            // 点击个人主页跳转到用户页面
            userInf.addEventListener('click', function () {
                // 将用户userid出入该网页url上
                location.href = `user.html?userId=${getParam(location.href, 'userId')}`;
            })

            // 点击退出登录
            quitLoad.addEventListener('click', function () {
                // 调用退出登录接口
                originAjax({
                    url: 'https://autumnfish.cn/logout',
                    data: {
                        // 输入用户cookie
                        cookie: getParam(location.href, 'cookie')
                    },
                    success: function (obj) {
                        // 成功后跳转到主页面，此时url没有带任何参数
                        location.href = 'index.html';
                    }
                })
            })
            // 点击“用户设置”时跳转到用户设置页面，并带上userid和cookie
            userSet.addEventListener('click', function () {
                location.href = `userset.html?userId=${getParam(location.href, 'userId')}&cookie=${getParam(location.href, 'cookie')}`;
            })
        })
    }
    // 当用户没有登录时，点击“登录”会跳转到登录界面
    open_load.addEventListener('click', function () {
        if (!getParam(location.href, 'userId')) {
            location.href = 'phonenumberLoad.html'
        }
    })








    // 该函数作用为获取歌曲id并播放
    playByA = function (songId) {
        // hid_songName.href 最下面播放器显示歌曲名字的a标签，点击可跳转到歌曲页面
        hid_songName.href = 'songs.html?songId=' + songId + '';
        // m = k m为记录此时播放的歌曲索引号，k为存放歌曲播放历史，即以数组形式存放歌曲Id
        m = k;
        historySong[k++] = songId;
        // 定时器作用： 防止用户点击过多过快导致调用接口过于频繁而出错
        // 用户点击后，先延迟一会再调用接口播放歌曲，如用户过快再一次点击时，即上一次不用调用接口
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
                    // str 歌手名字
                    let str = song[0].ar[0].name;
                    hid_songName.innerHTML = song[0].name;
                    // hid_songPicture 歌曲封面
                    hid_songPicture.src = song[0].al.picUrl;
                    // 判断歌手的个数
                    if (song[0].ar.length > 1) {
                        for (let i = 1; i < song[0].ar.length; i++) {
                            str += `/${song[0].ar[i].name}`
                        }
                    }
                    hid_singerName.innerHTML = str
                    // hid_flag 下面播放器按钮的形状，true为播放，false为暂停
                    hid_flag = true;
                    hid_play.click();
                }

            })
        }, 600);

    }


    // 3、3个榜单调用接口获取歌曲 开始

    // 飙升榜歌单获取
    // hotSongPlaylist 为ul
    const hotSongPlaylist = document.querySelector('.hotsong-playlist-ul');
    // 通过事件委托，将事件绑定在父元素上，点击可执行playByA()函数
    hotSongPlaylist.addEventListener('click', function (e) {
        // console.log(e);
        // console.log(e.path);
        // console.log(e.target);
        // 通过点击对象获取歌曲id
        let songId = e.target.getAttribute('songid');
        // let songId = e.path[0].getAttribute('songid');
        // let songId = this.querySelector('div').children[0].getAttribute('songid');
        // console.log(songId);
        playByA(songId);
    })


    originAjax({
        url: 'https://autumnfish.cn/top/list',
        data: {
            // 传入榜单Id
            id: 19723756
        },
        success: function (obj) {
            let playlist = obj.playlist;
            // console.log(playlist);
            // 进行字符串的拼接，拼接的内容加入到hotSongPlaylist中
            // 由于需要加入自定义属性，觉得用户script存储html的方式不合适
            let str = '';
            let str1 = '';
            let str2 = '<a href="javascript:;"></a><a href="javascript:;"></a>';
            let str3 = '';
            for (let i = 0; i < 10; i++) {
                str1 = `<span>${i + 1}</span><em><a href="songs.html?songId=${playlist.tracks[i].id}" class="songname" songid="${playlist.tracks[i].id}">${playlist.tracks[i].name}</a></em>`
                str3 = `<div><a heref="javascript:;" id="songPlay" songid="${playlist.tracks[i].id}"</a>${str2}</div>`;
                str += `<li>${str1 + str3}</li>`;
            }
            hotSongPlaylist.innerHTML = str + `<li class="record-liLast"><a href="#">查看全部 &gt;</a></li>`;
        }

    })

    // 以下代码的实现原理跟上述的一样

    // 新歌榜榜歌单获取
    const newSongPlaylist = document.querySelector('.newsong-playlist-ul');

    newSongPlaylist.addEventListener('click', function (e) {
        // console.log(e.target);
        let songId = e.target.getAttribute('songid');
        playByA(songId);
    })

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
            for (let i = 0; i < 10; i++) {
                str1 = `<span>${i + 1}</span><em><a href="songs.html?songId=${playlist.tracks[i].id}" class="songname" songid="${playlist.tracks[i].id}">${playlist.tracks[i].name}</a></em>`
                str3 = `<div><a heref="javascript:;" id="songPlay" songid="${playlist.tracks[i].id}"</a>${str2}</div>`;
                str += `<li>${str1 + str3}</li>`;

            }
            newSongPlaylist.innerHTML = str + `<li class="record-liLast"><a href="#">查看全部 &gt;</a></li>`;
        }

    })


    // 原创榜榜歌单获取
    const originSongPlaylist = document.querySelector('.originsong-playlist-ul');

    originSongPlaylist.addEventListener('click', function (e) {
        let songId = e.target.getAttribute('songid');
        playByA(songId);
    })

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
            for (let i = 0; i < 10; i++) {
                str1 = `<span>${i + 1}</span><em><a href="songs.html?songId=${playlist.tracks[i].id}" class="songname" songid="${playlist.tracks[i].id}">${playlist.tracks[i].name}</a></em>`
                str3 = `<div><a heref="javascript:;" id="songPlay" songid="${playlist.tracks[i].id}" </a>${str2}</div>`;
                str += `<li>${str1 + str3}</li>`;
            }
            originSongPlaylist.innerHTML = str + `<li class="record-liLast"><a href="#">查看全部 &gt;</a></li>`;

        }

    })

    // 3、3个榜单调用接口获取歌曲 结束


    // ！！！以下部分为歌曲播放设置和播放器相关的设置


    // audio 获取音频元素
    let audio = document.querySelector('audio');
    // hid_play 获取最下面播放按钮， 可控制播放或暂停
    let hid_play = document.querySelector('#hid-play');
    // hid_flag  控制按钮暂停或播放 全局变量，因为很多函数都要用到
    var hid_flag = true;
    // hid_songName 将获取的歌名记录下来，并在播放器上显示
    let hid_songName = document.querySelector('.hid-songname');
    // hid_singerName 隐藏的播放条上的歌手名字
    let hid_singerName = document.querySelector(".hid-singername")
    // hid_songPicture  隐藏的播放条的歌曲封面
    let hid_songPicture = document.querySelector('.hid-songpicture');
    // processTime  进度条 
    let processTime = document.querySelector('.processtime');
    // barTime  获取播放器上进度条的元素
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


    // 点击播放器播放按钮实现播放与暂停
    hid_play.addEventListener('click', function () {
        // 由于第一次打开页面时，audio是没有src属性的，所以先判断audio属性是否存在
        if (audio.src) {
            if (hid_flag) {   // 播放歌曲
                this.style.background = 'url(imgs/playbar.png) no-repeat 0 -165px';
                audio.play();
                // 先等歌曲缓存下来后，再设置歌曲总的时间
                setTimeout(function () {
                    songSumTime.innerHTML = setTime(audio.duration);
                }, 1000);
                // 每秒调用一次函数，实时获取进度条等
                play_timer = setInterval(progressTime, 1000);
                hid_flag = false;
            } else {   // 暂停歌曲
                this.style.background = 'url(imgs/playbar.png) no-repeat 0 -204px';
                // 暂停歌曲
                audio.pause();
                // 需要清除定时器，不然定时器累加会使进度条越走越快
                clearInterval(play_timer);   // 关闭定时器
                play_timer = null;
                hid_flag = true;
            }
        } else {
            // 当audio没有url时，提示信息
            alert('当前没有歌曲可播放！')
        }
    })

    // 拖动进度条改变歌曲播放时间
    // 先有按下mousedown事件，再有move事件
    processCircle.addEventListener('mousedown', function () {
        document.addEventListener('mousemove', move)
        function move(e) {
            // 根据鼠标拖动设置进度条宽度和小点的位置
            processCircle.style.left = e.clientX - barTime.offsetLeft + 'px';
            processTime.style.width = e.clientX - barTime.offsetLeft + 'px';
            audio.pause();  // 进度条拖动时先暂停歌曲
            // 调用函数，改变当前歌曲的播放时间
            progressTimeByMouse();
        }
        // 鼠标弹起时，取消这2个事件
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mousedown', move);
            audio.play();  // 进度条拖动结束时再播放歌曲
        })
        // 不需要一下两行代码，因为鼠标按下时会触发点击事件，会触发下面banTime事件
        hid_flag = true;
        hid_play.click()
    })

    // 实现点击进度条位置改变进度条宽度和小圆点位置，进而改变播放时间
    barTime.addEventListener('click', function (e) {
        // 获取宽度和位置
        processCircle.style.left = e.clientX - barTime.offsetLeft + 'px';
        processTime.style.width = e.clientX - barTime.offsetLeft + 'px';
        // 调用函数改变播放时间
        progressTimeByMouse();
        // 改变播放按钮状态，并获取实时播放时间和进度条等
        hid_flag = true;
        hid_play.click()
    })


    // 根据歌曲播放时间获取进度条的位置
    function progressTime() {
        // song_currentTime 歌曲当前的播放时间
        let song_currentTime = audio.currentTime;
        // song_totalTime 歌曲总的播放时间
        let song_totalTime = audio.duration;
        // 通过算法算出进度条的宽度 Math.round 取整
        let processTimeWidth = Math.round(song_currentTime * barTimeWidth / song_totalTime);
        // 设置进度条的宽度和进度条上的小点的left值
        processTime.style.width = processTimeWidth + 'px';
        processCircle.style.left = processTimeWidth - 5 + 'px';
        // 设置实时的播放时间,由于总的时间不需要实时获取，故不再这里设置
        songNowTime.innerHTML = setTime(audio.currentTime);
    }

    // 根据进度条位置设置播放时间
    function progressTimeByMouse() {
        // 根据算法，设置歌曲当前的播放时间
        // processTimeWidth  实时进度条当前宽度
        let processTimeWidth = processTime.offsetWidth;
        let song_totalTime = audio.duration;
        audio.currentTime = processTimeWidth * song_totalTime / barTimeWidth;
    }


    // 以下代码实现切换歌曲
    // play_left 播放器上面的按钮，点击切换上一首歌播放
    let play_left = document.querySelector('#play-left');
    // play_right 播放器上面的按钮，点击切换下一首歌播放
    let play_right = document.querySelector('#play-right');

    // 加定时器，防止点击过多时连续调用接口 
    play_left.addEventListener('click', function () {
        // 若用户第一次直接点击是没有歌曲可播放的，故需要判此时歌曲数组是否为空
        if (historySong.length == 0) {
            alert('当前没有可播放的歌曲！')
        } else {
            // m == 0 若m为0，即此时播放的是第一首歌曲，让m==k,再k--，即播放最后一首歌
            if (m == 0) {
                m = k;
            }
            m--;
            // 通过定时器避免用户点击过快过多造成过快连续调用接口
            clearTimeout(play_timer);
            play_timer = setTimeout(function () {

                let flag = true;
                audio.src = `https://music.163.com/song/media/outer/url?id=${historySong[m]}`;
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

                        // 由于判断音乐是否可用的接口有问题，以下代码为判断歌曲是否可用
                        // 当歌曲不能播放时，提示后跳转到上一首
                        audio.onerror = function () {
                            alert('!!该歌曲暂时没有版权！，已为您播放上一首！')
                            play_left.click();
                            flag = false;
                        }
                        // 通过Load事件虽然能阻止错误歌曲执行play功能，但能播放的也不能播放了，不知道为什么。。。
                        // audio.addEventListener('load', function() {
                        //     console.log(111);
                        //     audio.play();
                        //     hid_flag = true;
                        //     hid_play.click(); 
                        // })
                        // audio.onload = function() {
                        //     console.log(11);
                        //     audio.play();
                        //     hid_flag = true;
                        //     hid_play.click(); 
                        // }
                        // 由于执行onerror事件应该是异步的，故如不加定时器，上面的判断还没有结束，程序会直接走下一步播放歌曲
                        setTimeout(() => {
                            if (flag) {
                                audio.play();
                                hid_flag = true;
                                hid_play.click();
                            }
                        }, 200)
                    }
                })

            }, 800)
        }

    })

    // 点击切换下一首，原理生上述一样
    play_right.addEventListener('click', function () {
        if (historySong.length == 0) {
            alert('当前没有可播放的歌曲！')
        } else {
            if (m == k - 1) {
                m = -1;
            }
            m++;
            clearTimeout(play_timer);
            play_timer = setTimeout(function () {
                audio.src = `https://music.163.com/song/media/outer/url?id=${historySong[m]}`;
                let flag = true;
                originAjax({
                    url: 'https://autumnfish.cn/song/detail',
                    data: {
                        ids: historySong[m]
                    },
                    success: function (obj) {
                        // console.log(obj);
                        let song = obj.songs;
                        let str = song[0].ar[0].name;
                        hid_songName.href = `songs.html?songId=${ historySong[m]}`
                        hid_songName.innerHTML = song[0].name;
                        hid_songPicture.src = song[0].al.picUrl;
                        if (song[0].ar.length > 1) {
                            str = '';
                            for (let i = 0; i < song[0].ar.length; i++) {
                                str += `/${song[0].ar[i].name}`
                            }
                        }
                        hid_singerName.innerHTML = str;
                        audio.onerror = function () {
                            flag = false;
                            alert('暂时没有该歌曲的版权！已为您切换下一首');
                            play_right.click();
                        }
                        setTimeout(() => {
                            if (flag) {
                                audio.play();
                                hid_flag = true;
                                hid_play.click();
                            }
                        }, 200)
                    }
                })

            }, 800)
        }
    })

    // 当歌曲结束后，自动播放下一首
    audio.addEventListener('ended', function () {
        play_right.click();
    })

    // 单鼠标移动到浏览器可视窗口最下面时，播放器显示，否则隐藏
    let hid_Playcontent = document.querySelector('.play-hid');
    document.addEventListener('mousemove', function(e) {
        // console.log(window.innerHeight);
        // console.log(e.clientY);
        // console.log(hid_Playcontent.offsetHeight);  50
        // console.log(e.clientY -  hid_Playcontent.offsetHeight);
        
        // 如果此时为可隐藏状态时
        if ( !isOn) { 
            // 判断距离
        if (e.clientY +  hid_Playcontent.offsetHeight +10 >= window.innerHeight) {
            hid_Playcontent.style.bottom = 0 ;
            // console.log(e.clientY);
        } else {
            hid_Playcontent.style.bottom = -hid_Playcontent.offsetHeight - 12 + 'px';
        }
    }
    })
    let play_switch = document.querySelector('.switch2');
    // isOn 全局变量，判断播放器是否显示和隐藏
    var isOn = false;
    // 点击开关按钮
    play_switch.addEventListener('click', function() {
        if (isOn) {
            isOn = false;
            // 打开状态
            this.style.background = `url(imgs/playbar.png) no-repeat   -80px -380px `;
        } else {
            // 关闭状态
            this.style.background = `url(imgs/playbar.png) no-repeat   -100px -380px`;
            isOn = true;
        }
    })


    // 歌曲播放器部分结束


    //2、 热门推荐歌单部分调用接口实现 开始

    // hotPlaylists 热门推荐歌单的ul 
    const hotPlaylists = document.querySelector('.hot-song-ul');

    originAjax({
        url: 'https://autumnfish.cn/personalized',
        data: {
            // 需要8个歌单
            limit: 8,
        },
        success: function (obj) {
            console.log(obj);
            let playlists = obj.result;
            // console.log(playlists);
            for (let i = 0; i < 8; i++) {
                // 调用成功后，写入一些歌单的信息
                hotPlaylists.children[i].querySelector('.float').querySelector('a').setAttribute('playlistId', playlists[i].id)
                hotPlaylists.children[i].querySelector('img').src = playlists[i].picUrl;
                hotPlaylists.children[i].querySelector('p').querySelector('a').innerHTML = playlists[i].name;
            }
        }

    })

    // 实现点击歌单播放按钮时，能够自动播放歌单内容
    for (let i = 0; i < hotPlaylists.children.length; i++) {
        hotPlaylists.children[i].querySelector('.float').querySelector('a').addEventListener('click', function () {
            // playlist  获取歌单id
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
                    // 由于要播放该歌单内容，需要先清除歌曲播放历史
                    k = m = 0;
                    // 再把歌单里面的歌曲id存储如歌曲历史播放数组中
                    for (let j = 0; j < songs.length; j++) {
                        historySong[k++] = songs[j].id;
                    }
                    // 手动实现点击功能点击下一首，播放歌曲
                    play_right.click();
                }
            })
        })

    }

    //2、 热门推荐歌单部分调用接口实现 结束








    //5、 nav上搜索框实现 搜索功能实现 开始

    // search_input nav上面的搜索框
    let search_input = document.getElementById('search-input');
    // search_content 点击上述搜索框会显示搜索内容
    let search_content = document.querySelector('.search-hid');
    // relate_song 搜索相关的歌曲
    let relate_song = document.getElementById('relate-song');
    // relate_singer 搜搜相关的歌手
    let relate_singer = document.getElementById('relate-singer');
    // relate_album 相关的专辑
    let relate_album = document.getElementById('relate-ablum');
    // relate_playlists 相关的歌单
    let relate_playlists = document.getElementById('relate-playlists');
    // relate_user 相关的用户
    let relate_user = document.getElementById('relate-user');
    let search_timer = null;

    // 当用户点击搜索框输入内容时触发的时间
    search_input.addEventListener('input', function () {
        // key获取用户输入的关键词
        let key = this.value;
        // 需要开启定时器，防止用户再输入的过程中频繁调用接口，开启后只会在用户输入结束后才调用
        clearTimeout(search_timer);
        // key.trim()去掉用户输入内容两边的空格
        if (key.trim().length == 0) {
            // 即用户没有输入任何内容， 隐藏存放搜索内容的盒子
            search_content.style.display = 'none';
        } else {
            // 显示
            search_content.style.display = 'block';
            // 搜索相关用户
            relate_user.innerHTML = key;
            // 定时器
            search_timer = setTimeout(function () {
                originAjax({
                    type: 'get',
                    url: 'https://autumnfish.cn/search/suggest',
                    data: {
                        // key 输入的关键词
                        keywords: key
                    },
                    success: function (obj) {
                        let result = obj.result;
                        console.log(result);
                        // 先清除之前搜索的内容
                        relate_song.innerHTML = '';
                        // 当关键词搜索到有相关歌曲时
                        if (result.songs) {
                            // result.songs.length 搜索到的歌曲的数量
                            for (let i = 0; i < result.songs.length; i++) {
                                let li = document.createElement('li');
                                li.innerHTML = result.songs[i].name;
                                // 将歌曲id存放在li中
                                li.setAttribute('songId', result.songs[i].id)
                                relate_song.appendChild(li);
                            }
                        }

                        // 下述代码实现原理跟上述一样
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

        // 当搜索框失去焦点时，隐藏搜索内容
        search_input.addEventListener('blur', function () {
            // 定时器作用： 防止用户想要点击歌曲等进行播放时由于隐藏了不能点击
            setTimeout(function () {
                search_content.style.display = 'none';
            }, 600);
        })

        // 当搜索框获得焦点时，如关键词存在，则显示搜素内容
        search_input.addEventListener('focus', function () {
            if (this.value != '') {
                search_content.style.display = 'block';

            }
        })
    })

    // 在搜索框中按下回车键跳转到搜索界面
    search_input.addEventListener('keyup', function (e) {
        // 先判断搜索框是否有内容，避免用户输入空格回车后跳转
        if (this.value.trim() != '') {
            // 判断按键是不是回车
            if (e.code == 'NumpadEnter') {
                setTimeout(function () {
                    //带上关键词 跳转到搜索页面
                    location.href = 'search.html?keywords=' + search_input.value + '&type=1';
                }, 200);
            }
        }
    })

    // 通过事件委托，实现点击搜索到的歌曲点击能播放
    search_content.addEventListener('click', function (e) {
        // console.log(e.target);
        let songId = e.target.getAttribute('songid');
        // 传入songid，调用函数实现播放功能
        // 判断用户点击的是搜索到的歌曲才能播放
        if (songId) {
            historySong[k++] = songId;
            playByA(songId);

        }
    })

    // 搜索功能实现 结束


})


























