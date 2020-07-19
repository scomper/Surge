/*[URL Rewrite]
^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/feed\/ https://aweme.snssdk.com/aweme/v1/feed/ header
^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/aweme\/post\/ https://aweme.snssdk.com/aweme/v1/aweme/post/ header
^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/follow\/feed\/ https://aweme.snssdk.com/aweme/v1/follow/feed/ header
^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/nearby\/feed\/ https://aweme.snssdk.com/aweme/v1/nearby/feed/ header

[Script]
douyin_post.js = type=http-response,pattern=^https?:\/\/aweme\.snssdk\.com\/aweme/v1/aweme\/post\/,requires-body=1,max-size=-1,script-path=https://Choler.github.io/Surge/Script/douyin_post.js
douyin_feed.js = type=http-response,pattern=^https?:\/\/aweme\.snssdk\.com\/aweme\/v1\/feed\/,requires-body=1,max-size=-1,script-path=https://Choler.github.io/Surge/Script/douyin_feed.js
douyin_follow.js = type=http-response,pattern=^https?:\/\/aweme\.snssdk\.com\/aweme\/v1\/follow\/feed\/,requires-body=1,max-size=-1,script-path=https://Choler.github.io/Surge/Script/douyin_follow.js
douyin_naerby.js = type=http-response,pattern=^https?:\/\/aweme\.snssdk\.com\/aweme\/v1\/nearby\/feed\/,requires-body=1,max-size=-1,script-path=https://Choler.github.io/Surge/Script/douyin_nearby.js

[MITM]
hostname = %APPEND% *.amemv.com, aweme.snssdk.com
*/
let obj = JSON.parse($response.body);
if (obj.data) {
  for (var i = obj.data.length - 1; i >= 0; i--) {
    if (obj.data[i].aweme.video) {
      if (obj.data[i].aweme.status.reviewed != 1) {
        obj.data[i].aweme.status.reviewed = 1;
        obj.data[i].aweme.video_control.allow_download = true;
      }
      if (obj.data[i].aweme.video.download_addr) {
        let play = obj.data[i].aweme.video.play_addr.url_list;
        obj.data[i].aweme.video.download_addr.url_list = play;
      }
      if (obj.data[i].aweme.video.download_suffix_logo_addr) {
        let download = obj.data[i].aweme.video.download_addr;
        obj.data[i].aweme.video.download_suffix_logo_addr = download;
      }
    }
  }
}
$done({ body: JSON.stringify(obj) });