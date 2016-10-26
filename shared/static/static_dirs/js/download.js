var client = new WebTorrent()

function start(divId) {
    console.log($(divId).attr("value"))
    client.add($(divId).attr("value"),onTorrent);
    console.log("sadfdsf")
    function onTorrent (torrent) {
        console.log("s333333")
        log(
            'Torrent info hash: ' + torrent.infoHash + ' ' +
                '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
                '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
        )
        
        showFiles(torrent.files,"showFiles")
        var interval = setInterval(function(){updateStats(torrent,"showprogress")}, 1000)
        
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
