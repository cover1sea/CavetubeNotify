function desktopNotify(liveList){
  userList = "";
  for(var i=0; i<liveList.length; i++){
    userList = userList + liveList[i].user + "\n";
  }
  chrome.notifications.create(liveList[0].user, {
    type: 'basic',
    iconUrl: 'img/icon.png',
    title: "Cavetube Notify",
    message: userList,
    priority: 1
  }, (notificationId) => {
    chrome.notifications.onClicked.addListener(function(){
      chrome.notifications.clear(notificationId);
    });
  });
}



var liveCount = 0;
var rss = "http://rss.cavelis.net/index_live.xml";
var request      = new XMLHttpRequest();
var userList     = new Array();
var liveList     = new Array();
var newLiveList  = new Array();
var prevLiveList = new Array();
var desknote = true;
setInterval(function(){
  chrome.storage.sync.get(
    {
      userList: "",
      desknote: true
    },
    function(items){
      userList = items.userList;
      desknote = items.desknote;
    }
  );
  liveCount = 0;
  var live = [];
  request.open("GET", rss, true);
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      //GET Success
      xmldoc =request.responseXML;
      entry = xmldoc.getElementsByTagName("entry");
      newLiveList = [];
      for(i=0; i<entry.length; i++){
        streamInfo={
          title:        entry[i].getElementsByTagName("title")[0].textContent, 
          user:         entry[i].getElementsByTagName("name")[0].textContent,
          thumb:        entry[i].getElementsByTagName("ct:thumbnail_path")[0].textContent,
          numListeners: entry[i].getElementsByTagName("ct:listener")[0].textContent
        };
        //console.log(streamInfo);
        for(j=0; j<userList.length; j++){
          if(userList[j]){
            if(userList[j] === streamInfo.user){
              /* Live */
              if(streamInfo.thumb === "http:/img/no_thumbnail_image.png"){
                //For No Image streamer
                streamInfo.thumb = "img/no_profile_image.png";
              }
              live.push(streamInfo);
              liveList.push(streamInfo.user);
              if(prevLiveList.indexOf(streamInfo.user) == -1){
                newLiveList.push(streamInfo);
              }
              liveCount++;
            }
          }
        }        
      }
      if((newLiveList.length != 0) && desknote){
        desktopNotify(newLiveList);
      }
      prevLiveList = liveList.slice();
      chrome.browserAction.setBadgeText({"text": String(liveCount)});
      chrome.storage.sync.set({
        liveList: live,
      },function(){}
      );
    }
  };
  request.send(null);
},10000);

