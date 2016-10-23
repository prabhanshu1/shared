
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

function log (str,className="log") {
    var p = document.createElement('p')
    p.innerHTML = str
    document.querySelector('.'+className).appendChild(p)
}




