var client = new WebTorrent()

// Sintel, a free, Creative Commons movie
var torrentId =document.getElementById("torrent");


function start() {
    client.add(document.getElementById("torrent").value,onTorrent);

    function onTorrent (torrent) {
        log(
            'Torrent info hash: ' + torrent.infoHash + ' ' +
                '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
                '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
        )
        
        var $d=$("#data")
        $d.append("<p> Total Number of Files:  "+torrent.files.length)
        $d.append("<ul>")
        
        for(i=0;i<torrent.files.length;i++){
            $d.append("<li>"+torrent.files[i].name)
        }        
        $d.append("</ul>")

        var interval = setInterval(function(){updateStats(torrent,"showprogress")}, 3000)
        
        // torrent.on('done', function () {
        //     updateStats(torrent)
        //     //clearInterval(interval)
        // })

        // Render all files into to the page

        torrent.files.forEach(function (file) {
            console.log(file)
            file.appendTo('.log',{autoplay:false}, function (err, elem) {
                if (err) throw err // file failed to download or display in the DOM
                console.log('New DOM node with the content', elem)
            })
            
            file.getBlobURL(function (err, url) {
                if (err) return log(err.message)
                log('<a href="' + url + '" download="'+file.name+'">Download full file: ' + file.name + '</a>')
            })
        })
       
    }
    
};





