
//接收消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.cmd == 'update_font_size') alert(request.size);
    sendResponse('我收到了你的消息！');
});