window.addEventListener('load', function () {


    let userName = document.querySelectorAll('.user-name');
    let userPicture = document.querySelector('.user-picture');
    let userDetail = document.querySelector('#user-detail-ul');
    let topSongs = document.querySelector('.topsongs');
    let listenTime = document.querySelector('.listen-time');
    let userPlaylists = document.querySelector('.createplaylists');

    // 获得用户基本信息
    originAjax({
        url: 'https://autumnfish.cn/user/detail',
        data: {
            uid: getParam(location.href, 'userId')
        },
        success: function (obj) {
            // console.log(obj);
            for (let i = 0; i < userName.length; i++) {
                userName[i].innerHTML = obj.profile.nickname;
            }
            userPicture.src = obj.profile.avatarUrl;
            userDetail.children[0].querySelector('p').innerHTML = obj.profile.eventCount;
            userDetail.children[1].querySelector('p').innerHTML = obj.profile.follows;
            userDetail.children[2].querySelector('p').innerHTML = obj.profile.followeds;
            listenTime.innerHTML = '累积听歌'+ obj.listenSongs +'首';
        }
    })

    // 获得用户播放历史
    originAjax({
        url: 'https://autumnfish.cn/user/record',
        data: {
            uid: getParam(location.href, 'userId'),
            type: 1
        },
        success: function(obj) {
           let songs = obj.weekData;
        //    console.log(songs);
           let len = songs.length >= 10 ? 10 : songs.length;
           let str = '';
           let str1 = '<a href="javascript:;"></a>';
           let str2 = '';
           let str3 = '';
           let str4 = '<div><span></span><span></span><span></span><span></span><span></span></div>'
           for (let i = 0; i < len; i++) {
                str2 = '<span id="songName" songId="'+songs[i].song.id +'">'+ songs[i].song.name +'</span>'
                str3 = ' <i id="singerName"> -'+ songs[i].song.ar[0].name +'</i>';
                str += '<li>' + str1 + str2 + str3 + str4 + '</li>';
            }
            topSongs.innerHTML = '<ul>' + str + '</ul>';
        }
    })

    // 获得用户创建的歌单
    originAjax({
        url: 'https://autumnfish.cn/user/playlist',
        data: {
            uid: getParam(location.href, 'userId')
        },
        success: function(obj) {
            let playlists = obj.playlist;
            console.log(playlists);
            let str = '';
            let str1 = '';
            let str2 = '';
            for (let i = 0; i < playlists.length; i++) {
                str1 = '<img src=" '+ playlists[i].coverImgUrl +'"></img>';
                str2 = '<a href="javascript:;" playlistId="'+ playlists[i].id +'">'+ playlists[i].name +'</a>';
                str += '<li>' + str1 + str2 + '</li>';
            }
            userPlaylists.innerHTML = str;
        }
    })




})


// https://autumnfish.cn/user/playlist?uid=19723756    用户创建的歌单
// url: 'https://autumnfish.cn/user/detail',
// data: {
//     uid: getParam(location.href, 'userId')
// },

// /user/record?uid=32953014&type=1