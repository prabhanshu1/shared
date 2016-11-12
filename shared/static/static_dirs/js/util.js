
function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function updateStats(torrent,div) {
    var str="<p> Down Speed: "+formatBytes(torrent.downloadSpeed)+"/s\t Up Speed: "+formatBytes(torrent.uploadSpeed)+"/s</p>"+
        "<p> Peers: "+torrent.numPeers+" Total Downloaded: "+formatBytes(torrent.downloaded)+"</p>"+
        "<p> Progress "+(torrent.progress*100).toFixed(1)+"%"+"\tTime Remaining: "+(torrent.timeRemaining/1000).toFixed(1)+" Sec" +"</p>"
    //test=div;
    $(div.children.showProgress).html(str)
}

function removeFile(div,fileId)
{
    if (fileId > -1) {
        fileStore[div.id].splice(fileId,1);
        showFilesxxx(div)
    }
}

function showFilesxxx(div)
{
    fileList=fileStore[div.id];
    var str="<p> Total Number of Files: "+fileList.length
    str+="<ul>"
    for(i=0;i<fileList.length;i++){
        str+="<li>"+fileList[i].name+'</li><button id="removeFile'+i+1+'"'+'onclick="removeFile('+div.id+","+i+')">Remove</button>'
    }
    str+="</ul>"
    str+="</p>"
    $(div.children.selectedFiles).html(str)
}

function showEmailsxxx(div)
{
    emailList=emailStore[div.id];
    var str="<p> Total Emails Added: "+emailList.length
    str+="<ul>"
    for(i=0;i<emailList.length;i++){
        str+="<li>"+emailList[i]+'</li><button id="removeEmail'+i+1+'"'+'onclick="removeEmail('+div.id+","+i+')">Remove</button>'
    }
    str+="</ul>"
    str+="</p>"
    $(div.children.selectedEmails).html(str)
}

function removeEmail(div,emailId)
{
    if (emailId > -1) {
        emailStore[div.id].splice(emailId,1);
        showEmailsxxx(div)
    }
}

function showFriendsxxx(div)
{
    friendList=friendStore[div.id];
    var str="<p> Total Friends t0 Add in Your FriendList: "+friendList.length
    str+="<ul>"
    for(i=0;i<friendList.length;i++){
        str+="<li>"+friendList[i]+'</li><button id="removefriend'+i+1+'"'+'onclick="removeFriend('+div.id+","+i+')">Remove</button>'
    }
    str+="</ul>"
    str+="</p>"
    $(div.children.friendsToAdd).html(str)
}

function removeFriend(div,friendId)
{
    if (friendId > -1) {
        friendStore[div.id].splice(friendId,1);
        showFriendsxxx(div)
    }
}


function showFiles(fileList,div)
{
    var str="<p> Total Number of Files: "+fileList.length
    str+="<ul>"
    for(i=0;i<fileList.length;i++){
        str+="<li>"+fileList[i].name+"</li>"
    }
    str+="</ul>"
    str+="</p>"
    $(div.children.showFiles).html(str)
}
function log (str,div) {
    var p = document.createElement('p')
    p.innerHTML = str
    // document.querySelector('.'+className).appendChild(p)
    $(div.children.log).append(p)
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});
