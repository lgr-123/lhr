
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

