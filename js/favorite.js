/* 
   v1.64 通知ユーザリストの取得を関数内でも再度行うようにした．
         ページを開いた時点での通知リストに追加してしまい，複数窓で操作すると誤動作するため  
*/

function removeNotify(){
  chrome.storage.sync.get({
      userList: "doge"
    },
    function(items){
      if(items.userList != "doge"){
        userArry = items.userList;
      }else{
        userArry = [];
      } 
      userArry.splice(userNum,1);
      chrome.storage.sync.set({
        userList: userArry,
      }, function() {
        document.getElementById("rmN").innerHTML = "通知リストから除外しました。";
      });
    }
  );
 
}

function addNotify(){
  chrome.storage.sync.get({
      userList: "doge"
    },
    function(items){
      if(items.userList != "doge"){
        userArry = items.userList;
      }else{
        userArry = [];
      }
      userArry.push(author);
      chrome.storage.sync.set({
        userList: userArry,
      }, function() {
        document.getElementById("addN").innerHTML = "追加しました。";
      });
    }
  );
  
}

/*
function getList(){
  chrome.storage.sync.get({
      userList: "doge"
    },
    function(items){
      if(items.userList != "doge"){
        userArry = items.userList;
      }else{
        userArry = [];
      }
    }
  );
}
*/
temp = document.getElementById("entry_header").getElementsByClassName("author");
author = temp[0].textContent;
author = author.replace(/さん$/, "");
userArry = [];
chrome.storage.sync.get({
    userList: "doge"
  },
  function(items){
    if(items.userList != "doge"){
      userArry = items.userList;
    }else{
      userArry = [];
    }
    for(i=0; i<userArry.length; i++){
      if(author == userArry[i]){
        userNum = i;
        document.getElementById("entry_header").innerHTML = document.getElementById("entry_header").innerHTML + '<p id="rmN"><a id="removeNotify" href="#">通知リストから除外する</a></p>';
        document.getElementById('removeNotify').addEventListener('click', removeNotify);
        break;
      }
    }
    if(i == userArry.length){
      document.getElementById("entry_header").innerHTML = document.getElementById("entry_header").innerHTML + '<p id="addN"><a id="addNotify" href="#">通知リストに追加する</a></p>';
      document.getElementById('addNotify').addEventListener('click', addNotify);
    }
  }
);
