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
if (obj.aweme_list) {
  for (var i = obj.aweme_list.length - 1; i >= 0; i--) {
    if (obj.aweme_list[i].video) {
      if (obj.aweme_list[i].status.reviewed != 1) {
        obj.aweme_list[i].status.reviewed = 1;
        obj.aweme_list[i].video_control.allow_download = true;
      }
      if (obj.aweme_list[i].video.download_addr) {
        let play = obj.aweme_list[i].video.play_addr.url_list;
        obj.aweme_list[i].video.download_addr.url_list = play;
      }
      if (obj.aweme_list[i].video.download_suffix_logo_addr) {
        let download = obj.aweme_list[i].video.download_addr;
        obj.aweme_list[i].video.download_suffix_logo_addr = download;
      }
    }
  }
}
$done({ body: JSON.stringify(obj) });