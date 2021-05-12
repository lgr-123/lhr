window.addEventListener('load', function () {

    function getParam(url, param) {
        if (url.includes('?') && url.includes(param)) {
            let str1 = url.split(param + '=')[1];

            if (str1.includes('&')) {
                let str2 = str1.split('&');
                return str2[0];
            } else {
                return str1;
            }
        } else {
            return
        }
    }

    function setTime(time) {
        let minute = parseInt(time / 60);
        minute = minute < 10 ? '0' + minute : minute;
        let second = parseInt(time % 60);
        second = second < 10 ? '0' + second : second;

        return minute + ':' + second;
    }


    let search_headUl = document.querySelector('.search-head').querySelector('ul');





    for (let i = 0; i < search_headUl.children.length; i++) {
        if (search_headUl.children[i].getAttribute('type') == getParam(location.href, 'type')) {
            search_headUl.children[i].style.borderTop = '2px solid #d13030';
        }
        search_headUl.children[i].addEventListener('click', function () {
            location.href = "search.html?keywords=" + getParam(location.href,'keywords') +'&type=' + this.getAttribute('type');      
        })
    }





    // 'https://autumnfish.cn/search?keywords= 海阔天空&type=1002

    // getParam(location.hrft, 'keywords')
    let search_content = document.querySelector('.search-content');

        originAjax({
            url: 'https://autumnfish.cn/search',
            data: {
                keywords: getParam(location.href, 'keywords'),
                type: getParam(location.href, 'type')
            },
            success: function (obj) {
                if (getParam(location.href, 'type') == 1) {
                    console.log(obj);
                    let songs = obj.result.songs;
                    let str = '';
                    let str1 = '';
                    let str2 = '<div><span></span><span></span><span></span><span></span><span></span></div>';
                    let str3 = '';
                    let str4 = '';
                    let str5 = '';
                    let length = obj.result.songs.length >= 20? 20 : obj.result.songs.length;
                    for (let i = 0; i < length; i++) {
                        str1 = '<div><span></span>' + songs[i].name + '</div>';
                        str3 = '<div> ' + songs[i].artists[0].name + '</div>';
                        str4 = '<div>' + songs[i].album.name + '</div>';
                        str5 = '<div>' + setTime(parseInt(songs[i].duration / 1000)) + '</div>';
                        str += '<li songId="' + songs[i].id + '">' + str1 + str2 + str3 + str4 + str5 + '</li>';
                    }
                    search_content.innerHTML = '<ul class="search-song">'+ str +'</ul>';
                } else if (getParam(location.href, 'type') == 100) {
                    console.log(obj);
                    let artists = obj.result.artists;
                    let str = '';
                    let str1 = '';
                    let str2 = '';
                    let length = artists.length >= 24? 24 : artists.lengthh;
                    for (let i = 0;i < length; i++) {
                        str1 = '<img src="'+ artists[i].picUrl +'"></img>';
                        str2 = '<div>'+ artists[i].name +'</div>'
                        str += '<li>' + str1 + str2 + '</li>';
                    }
                    search_content.innerHTML = '<ul class="search-singer">'+ str +'</ul>';
                }
               
            }
        })

    

        

})