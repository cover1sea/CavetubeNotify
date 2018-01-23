/*
  v1.63 ユーザの重複と空白名削除機能
*/

function maintenance(userArry) {
  for(i=0; i<userArry.length; i++){
    if(userArry[i] == ""){
      userArry.splice(i, 1);
      i--;
      continue;
    }
    for(j=i+1; j<userArry.length; j++){
      if(userArry[i] == userArry[j]){
        userArry.splice(j, 1);
        j--;
      }
    }
  }

}


// Saves options to chrome.storage
function save_options() {
  var users = document.getElementById('userList').value;
  var userArry = users.split(/\r\n|\r|\n/);
  if(userArry.length > 1){
    maintenance(userArry);
  }

  chrome.storage.sync.set({
    userList: userArry,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '保存しました。';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
  document.getElementById('userList').value = "";
  restore_options();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    userList: ""
  }, function(items) {
    for(i=0; i<items.userList.length; i++){
      text = document.getElementById('userList').value
      document.getElementById('userList').value = text + items.userList[i] + "\n";
    }
  });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);