var liveCount = 0;
var rss = "http://rss.cavelis.net/index_live.xml";
var request = new XMLHttpRequest();
var userList = new Array();

setInterval(function(){
  chrome.storage.sync.get(
    {userList: ""},
    function(items){
      userList  = items.userList;
    }
  );
  liveCount = 0;
  var live = [];
  var liveThumb = [];
  request.open("GET", rss, true);
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      for(i=0; i<userList.length; i++){
        if(userList[i]){
          if(request.responseText.indexOf("<name><![CDATA["+userList[i])!=-1){
            /* Live */
            live.push(userList[i]);
            liveCount++;
            
            /* get thumbnail */
            search = new RegExp("http://.*" + userList[i] + ".*.png");
            thumb = request.responseText.match(search);
            if(!thumb){
              thumb = "img/no_profile_image.png";
            }
            liveThumb.push(thumb);
          }
        }
      }
      chrome.browserAction.setBadgeText({"text": String(liveCount)});
      chrome.storage.sync.set({
        liveList: live,
        thumbnail: liveThumb
      },function(){}
      );
    }
  };
  request.send(null);
},10000);
