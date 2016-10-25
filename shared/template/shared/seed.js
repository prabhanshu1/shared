var client = new WebTorrent()

var fileStore=[];

jQuery("input#upload").change(function(){
    var fileList = document.getElementById("upload").files
    fileStore.push.apply(fileStore,fileList)
    showFilesxxx(fileStore,"selectedFiles");
})

$("button#stopSeeding").click(function(){
    client.remove($("button#stopSeeding").attr("value"))
})
jQuery("button#startSeeding").click(function () {

    console.log(fileStore)
    client.seed(fileStore, function (torrent) {
        $("button#stopSeeding").attr("value",torrent.magnetURI)
        setInterval(function(){updateStats(torrent,"showprogress")}, 3000)

        torrent.files.forEach(function (file) {
            file.appendTo('.log',{autoplay:false}, function (err, elem) {
                if (err) throw err // file failed to download or display in the DOM
            })
        })
        console.log('Client is seeding ' + torrent.magnetURI)
    })

    //    onFiles(jQuery(this).val())
    
});

//uploadElement(upload, function (err, files) {
//  files = files.map(function (file) { return file.file })
// onFiles(files)
//})


function onFiles (files) {
    files.forEach(function (file) {
        console.log("in onfiles"+ file.name +"\n$$$"+ file.size)
    })

    // .torrent file = start downloading the torrent
    files.filter(isTorrentFile).forEach(downloadTorrentFile)

    // everything else = seed these files
    seed(files.filter(isNotTorrentFile))
}

// dragdrop('body', function (files) {
//   client.seed(files, function (torrent) {
//     console.log('Client is seeding ' + torrent.magnetURI)
//   })
// })




