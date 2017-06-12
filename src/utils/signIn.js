
//这里面基本是与登陆相关的方法和请求，还有设置font size；


var nodeurl = "http://camp.liver-cloud.com/platform/",

    oGetVars = {},
    
    userName = localStorage.getItem('userId'),

    locationSelf = location,

    locationSelfSearch = locationSelf.search,

    viewWidth ,

    html = document.documentElement,

    u_id = sessionStorage.getItem("userId");

if (!viewWidth) {
    if (html) {
        var windowWidth = html.clientWidth / 7.5;
        viewWidth = windowWidth + 'px';
        // localStorage.setItem("viewWidth", viewWidth);
    }
}

// 设置根元素的字体大小
html.style.fontSize = viewWidth ;

//该方法是解析URL的

(function (sSearch) {
    var rNull = /^\s*$/,
        rBool = /^(true|false)$/i;
    function buildValue(sValue) {
        if (rNull.test(sValue)) {
            return null;
        }
        if (rBool.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        }
        if (isFinite(Date.parse(sValue))) {
            return new Date(sValue);
        }
        return sValue;
    }
    if (sSearch.length > 1) {
        for (var aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
            aItKey = aCouples[nKeyId].split("=");
            oGetVars[decodeURIComponent(aItKey[0])] = aItKey.length > 1
                ? buildValue(decodeURIComponent(aItKey[1]))
                : null;
            //此处将unescape()替换了
        }
    }
})(locationSelfSearch);

var e = locationSelfSearch.substring(1);
var g = decodeURIComponent(e);
var h = g.split("&");

//如果链接中有参数，并且userName不存在，说明是登录完成后返回的的链接；
if (e && !userName && !oGetVars.d) {
    for (var c = 0, b = h.length; c < b; c++) {
        var f = h[c];
        var a = f.split("=");
        localStorage.setItem(a[0], a[1]);
    }
    locationSelf.href=sessionStorage.getItem('shareUrl')
}
// alert(location.href)
//分享那部分的链接进行先存储，下来，登录后的不受影响；
// alert("d"+oGetVars.d)
// alert(oGetVars.planId)
if (oGetVars.d) {
    for (var c = 0, b = h.length; c < b; c++) {
        var f = h[c];
        var a = f.split("=");
        sessionStorage.setItem(a[0], a[1])
    }
    //将分享的连接保存下来用于分享时候用
     sessionStorage.setItem('shareUrl',locationSelf.href)
}

//鉴别是否登陆，如果没有登陆就的登陆

if (!userName) {
    // console.log('登录还没完成')
    // checkWxLogin()
}

//判断微信环境的

var ua = navigator
    .userAgent
    .toLowerCase();

if (ua.match(/MicroMessenger/i) == "micromessenger") {

} else {
    // locationSelf.href=''
}


//type是页面的本地地址
function checkWxLogin(type) {
    userName = localStorage.getItem("userId");
    if (!userName) {
        location.href = ""
    }
}