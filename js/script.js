chrome.storage.sync.get({
    liveList: "",
    thumbnail: ""
  },
  function(items){
    for(i=0; i<items.liveList.length; i++){
      text = document.getElementById("live").innerHTML;
      document.getElementById("live").innerHTML = text + '<li><a href="https://www.cavelis.net/live/' + items.liveList[i] + '" target="_blank"><img src="' + items.thumbnail[i] + '" width="60px" height="auto" align="middle" />' +items.liveList[i] + "</a></li>";
    }
  }
);

