function originAjax(options) {

    // 设置默认值
    let defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'content-Type': 'application/x-www-form-urlencoded'
        },
        success: function () { },
        error: function () { }
    };

    Object.assign(defaults, options);


    const xhr = new XMLHttpRequest();
    let params = '';

    for (let attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
    }

    params = params.substr(0, params.length - 1);

    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }

    xhr.open(defaults.type, defaults.url, true);

    if (defaults.type == 'post') {
        let contentType = defaults.header['Content-Type'];
        // xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('content-Type', contentType);
        if (contentType == 'application/json') {
            xhr.send(JSON.stringify(defaults.date));
        } else {
            xhr.send(params);
        }

    } else {
        xhr.send();
    }

    xhr.onload = function () {
        let contentType = xhr.getResponseHeader('Content-Type');
        let responseText = xhr.responseText;

        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText);
        }

        if (xhr.status == 200) {
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }
    }
}

 // 封装函数获取地址中的参数
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


// 修改时间的格式 00:00
function setTime(time) {
    let minute = parseInt(time / 60);
    minute = minute < 10 ? '0' + minute : minute;
    let second = parseInt(time % 60);
    second = second < 10 ? '0' + second : second;

    return minute + ':' + second;
}


