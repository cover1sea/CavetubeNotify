chrome.storage.sync.get({
    liveList: "",
  },
  function(items){
    for(i=0; i<items.liveList.length; i++){
      text = document.getElementById("live");
      text.innerHTML = text.innerHTML + '<li><a href="https://www.cavelis.net/live/' + items.liveList[i].user + '" target="_blank"> </a><div class="popup_image"><img src="' + items.liveList[i].thumb + '" width="70px" height="auto" align="middle" /></div><div class="popup_text"><p class="streamer">' +items.liveList[i].user + '</p><p class="info">' + items.liveList[i].title + ' - ' + items.liveList[i].numListeners + ' listeners</p></div><div class="popup_dummy"></div></li>';
    }
  }
);

