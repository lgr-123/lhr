
function originAjax(options) {
    const xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let obj = JSON.parse(xhr.response);
            // console.log(obj.banners);
            // return obj.banners;
            // options.async = false;
            console.log(obj);
            options.success(obj);
            options.error(obj);
        }


    }
    // let obj = JSON.parse(xhr.response);
    // options.success(obj.banners);
}
