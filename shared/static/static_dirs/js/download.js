var client = new WebTorrent()
var test;
var torr;
function start(div) {
    client.add($(div).attr("value"),onTorrent);
    console.log(div)
    function onTorrent (torrent) {
        torr=torrent;
        test=div;
        log(
            'Torrent info hash: ' + torrent.infoHash + ' ' +
                '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
                '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>',div)
        showFiles(torrent.files,div);
        var interval = setInterval(function(){updateStats(torrent,div)}, 1000)
        console.log("befre  ready function")
        torrent.on('metadata', function () {

            console.log("in metadata function")
            torrent.destroy(function(){
                console.log("destroyed torrent.")
            });
        })

        // torrent.on('done', function () {
        //     updateStats(torrent)
        //     //clearInterval(interval)
        // })

        // Render all files into to the page

        torrent.files.forEach(function (file) {
            console.log(file)
            file.appendTo($(div.children.log)[0],{autoplay:false}, function (err, elem) {
                if (err) throw err // file failed to download or display in the DOM
                console.log('New DOM node with the content', elem)
            })
            
            file.getBlobURL(function (err, url) {
                if (err) return log(err.message)
                log('<a href="' + url + '" download="'+file.name+'">Download full file: ' + file.name + '</a>',div)
            })
        })
       
    }
    
};
