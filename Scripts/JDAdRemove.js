const path1 = "start";
const path2 = "myOrderInfo";
const path3 = "orderTrackBusiness";

let url = $request.url;
let body = JSON.parse($response.body);

if (url.indexOf(path1) != -1) {
  body.images = [];
  body.showTimesDaily = 0;
}

if (url.indexOf(path2) != -1 || url.indexOf(path3) != -1) {
  body.floors = body.floors.filter(function(item) {
    if (item.mId == "bannerFloor" || item.mId == "orderTrackPush" || item.mId == "jdDeliveryBanner" || item.mId == "commonBanner" || item.mId == "orderQuestionAnswer") {
      return false;
    }
    return true;
  });
}

$done({
  body: JSON.stringify(body)
});
