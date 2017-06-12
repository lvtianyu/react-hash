/**
 * Created by lvtianyu on 16/6/29.
 */
import fetch from 'isomorphic-fetch'
var urlContent = {};
function  urlFn(title){
        urlContent={
            h : sessionStorage.getItem('shareUrl'),
            title : title,
            content : "我的小秘密，想听吗",
            pic : "http://camp.liver-cloud.com/my_plan/dist/share.png"
        };

}


function initWxJSSDK(title) {
    urlFn(title)
    var thisPageUrl = encodeURIComponent(sessionStorage.getItem('shareUrl'));
    
    // console.log(thisPageUrl)

    let url='http://camp.liver-cloud.com/my_plan/wechat/initJSSDK.do?pageUrl='+thisPageUrl   

            return fetch(url)
                    .then(response=>response.json())
                    .then(json=>{
                        if (json.result == "ok") {
                        var _signJson = json.values,
                            _appid = _signJson.appid,
                            _timestamp = _signJson.timestamp,
                            _noncestr = _signJson.noncestr,
                            _signature = _signJson.signature;
                            //初始化微信sdk
                            wx.config({
                                debug: false,
                                appId: _appid,
                                timestamp: _timestamp,
                                nonceStr: _noncestr,
                                signature: _signature,
                                jsApiList: [
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage',
                                    'checkJsApi',
                                ]
                            });

                    } else {
                        alert(json.errormsg);
                    }
            })

}

if(wx != undefined){
    wx.ready(function () {

        //判断当前客户端版本是否支持指定JS接口
        wx.checkJsApi({
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'chooseWXPay',
                'checkJsApi',
            ],
            success: function (res) {
                // console.log(res);
                console.log(urlContent);
            }
        });

        //朋友圈
        wx.onMenuShareTimeline({
            title: urlContent.title, // 分享标题
            link: urlContent.h, // 分享链接
            imgUrl:urlContent.pic, // 分享图标
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            trigger: function (res) {
                //shareLog()
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {

                //shareLog()
                alert('已分享');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
            title: urlContent.title, // 分享标题
            desc: urlContent.content, // 分享描述
            link: urlContent.h, // 分享链接
            imgUrl:urlContent.pic, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                //alert("成功")
                // 用户确认分享后执行的回调函数
                //shareLog()
                alert('已分享');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                //alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });

    });
}

export default initWxJSSDK

