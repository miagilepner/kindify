var off = "icon.png";
var on = "icon-on.png";
var isOn = false;
function updateIcon(){
    var newIcon="";
    if(isOn == true){
        newIcon = off;
        isOn = false;
    }
    else{
        newIcon = on;
        isOn = true;
    }

    chrome.browserAction.setIcon({path:newIcon});
}

chrome.browserAction.onClicked.addListener(updateIcon);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.checkIfOn){
            sendResponse({onOff: isOn});
        }
        else{
            sendResponse({});
        }
  });
