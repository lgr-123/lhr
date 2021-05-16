window.addEventListener('load', function () {

    


    // search_headUl 搜索的ul,里面的li是搜索的类型 
    let search_headUl = document.querySelector('.search-head').querySelector('ul');
    for (let i = 0; i < search_headUl.children.length; i++) {
    // 先判断url上的搜索类型type是什么，再跟li的自定义属性对应，添加红色上边框
        if (search_headUl.children[i].getAttribute('type') == getParam(location.href, 'type')) {
            search_headUl.children[i].style.borderTop = '2px solid #d13030';
        }
        // 点击不同的li，会显示不同的搜索内容，但关键词不变
        search_headUl.children[i].addEventListener('click', function () {
            location.href = "search.html?keywords=" + getParam(location.href,'keywords') +'&type=' + this.getAttribute('type');      
        })
    }

    // 判断搜索类型后，再渲染相应的内容
    // search_content 搜索结果展示
    let search_content = document.querySelector('.search-content');
        originAjax({
            url: 'https://autumnfish.cn/search',
            data: {
                // 传入关键词和类型
                keywords: getParam(location.href, 'keywords'),
                type: getParam(location.href, 'type')
            },
            success: function (obj) {
                // 调用的接口是一样的，只是type不太一样，所以要判断type的值
                if (getParam(location.href, 'type') == 1) {
                    // console.log(obj);
                    let songs = obj.result.songs;
                    let str = '';
                    let str1 = '';
                    let str2 = '<div><span></span><span></span><span></span><span></span><span></span></div>';
                    let str3 = '';
                    let str4 = '';
                    let str5 = '';
                    // 判断搜索结果如果数量大于20的话只显示前20个
                    let length = obj.result.songs.length >= 20? 20 : obj.result.songs.length;
                    for (let i = 0; i < length; i++) {
                        // 模板字符动态渲染页面
                        str1 = `<div><span></span>${songs[i].name}</div>`;
                        str3 = `<div>${songs[i].artists[0].name}</div>`;
                        str4 = `<div>${songs[i].album.name}</div>`;
                        str5 = `<div>${setTime(parseInt(songs[i].duration / 1000))}</div>`;
                        str += `<li songId="${songs[i].id}">${str1 + str2 + str3 + str4 + str5}</li>`;
                    }
                    search_content.innerHTML = `<ul class="search-song">${str}</ul>`;
                } else if (getParam(location.href, 'type') == 100) {
                    // 以下实现原理都一样
                    // console.log(obj);
                    let artists = obj.result.artists;
                    let str = '';
                    let str1 = '';
                    let str2 = '';
                    let length = artists.length >= 24? 24 : artists.lengthh;
                    for (let i = 0;i < length; i++) {
                        str1 = `<img src="${artists[i].picUrl}"></img>`;
                        str2 = `<div>${artists[i].name}</div>`;
                        str += `<li>${str1 + str2}</li>`;
                    }
                    search_content.innerHTML = `<ul class="search-singer">${str}</ul>`;
                }
               
            }
        })

    



})