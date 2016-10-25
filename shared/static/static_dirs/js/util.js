
function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function updateStats(torrent,id) {
    var str="<p> Down Speed: "+formatBytes(torrent.downloadSpeed)+"/s\t Up Speed: "+formatBytes(torrent.uploadSpeed)+"/s</p>"+
        "<p> Peers: "+torrent.numPeers+" Total Downloaded: "+formatBytes(torrent.downloaded)+"</p>"+
        "<p> Progress "+(torrent.progress*100).toFixed(1)+"%"+"\tTime Remaining: "+(torrent.timeRemaining/1000).toFixed(1)+" Sec" +"</p>"
    document.getElementById(id).innerHTML=str
}

function showFilesxxx(fileList,id)
{
    var str="<p> Total Number of Files: "+fileList.length
    str+="<ul>"
    for(i=0;i<fileList.length;i++){
        str+="<li>"+fileList[i].name+'</li><button id="removeFile'+i+'"'+'onclick="removeFile('+'this.closest("div").prop("id"),'+i+')">Remove</button>'
    }        
    str+="</ul>"
    str+="</p>"
    $("#"+id).html(str)
}


function showFiles(fileList,id)
{
    var str="<p> Total Number of Files: "+fileList.length
    str+="<ul>"
    for(i=0;i<fileList.length;i++){
        str+="<li>"+fileList[i].name+"</li>"
    }        
    str+="</ul>"
    str+="</p>"
    $("#"+id).html(str)
}
function log (str,className="log") {
    var p = document.createElement('p')
    p.innerHTML = str
    document.querySelector('.'+className).appendChild(p)
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

