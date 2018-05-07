$(function () {
         var url =location.href.split('#')[0];
         var base = new Base64();
         url = base.encode(url);
         console.log(url);
         $.ajax({
             url: "/wxapi/api/getJsSdkConf?url=" + url,
             async: true,
             type: "GET",
             beforeSend: function () {
             },
             success: function (data) {
                 console.log(data);
                 wx.config({
                     debug: false,
                     appId: data.data.appid,
                     timestamp: data.data.timeStamp,
                     nonceStr: data.data.nonceStr,
                     signature: data.data.signature,
                     jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                         'onMenuShareAppMessage', 'getLocation', 'openLocation',
                         'hideOptionMenu']
                 });
                 wx.error(function(res){
                     alert(JSON.stringify(data))
                     alert("签名失败："+JSON.stringify(res))
                 });
                 wx.ready(function () {
                     wx.checkJsApi({
                         jsApiList: ['getNetworkType', 'previewImage', 'getLocation'],
                         success: function (res) {
                             if (res.checkResult.getLocation == false) {
                                 alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                                 return;
                             }
                         }
                     });
                     wx.hideOptionMenu();
                     wx.getLocation({
                         success: function (res) {
                             var lat = res.latitude;
                             var lng = res.longitude;
                             findStore(lng,lat);
                         },
                         cancel: function (res) {
                             alert('用户拒绝授权获取地理位置');
                         }
                     });
                 });
             },
             complete: function () {
             },
             error: function () {
                 alert("失败")
             }
         });
     })
