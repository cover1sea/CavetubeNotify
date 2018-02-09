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
  request.open("GET", rss, true);
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      //GET Success
      
      xmldoc =request.responseXML;
      entry = xmldoc.getElementsByTagName("entry");
      for(i=0; i<entry.length; i++){
        streamInfo={
          title:        entry[i].getElementsByTagName("title")[0].textContent, 
          user:         entry[i].getElementsByTagName("name")[0].textContent,
          thumb:        entry[i].getElementsByTagName("ct:thumbnail_path")[0].textContent,
          numListeners: entry[i].getElementsByTagName("ct:listener")[0].textContent
        };
        console.log(streamInfo);
        for(j=0; j<userList.length; j++){
        if(userList[j]){
          if(userList[j] === streamInfo.user){
            /* Live */
            if(streamInfo.thumb === "http:/img/no_thumbnail_image.png"){
              //For No Image streamer
              streamInfo.thumb = "img/no_profile_image.png";
            }
            live.push(streamInfo);
            liveCount++;
            
          }
        }
      }
      }
      chrome.browserAction.setBadgeText({"text": String(liveCount)});
      chrome.storage.sync.set({
        liveList: live,
      },function(){}
      );
    }
  };
  request.send(null);
},10000);

