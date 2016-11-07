var client = new WebTorrent();
var torr;
var fileStore = [];
var torrentList =[];

window.setInterval(function(){
    $.ajax({
        type: 'POST',
        url: "updatedata",
        data: {'torrent[]': torrentList },
        async: true
    });
}, 5000);

function addFiles() {
    var fileList = document.getElementById("upload").files;
    fileStore.push.apply(fileStore, fileList);
    showFilesxxx(fileStore, "selectedFiles");
}

function stopSeeding(divId) {
    client.remove($(divId).attr("value"));
}


function startSeeding(divId) {

    client.seed(fileStore, function(torrent) {
        //fileStore=[];
        torrentList.push(torrent.magnetURI);
        torrentList.push(torrent.magnetURI);
        torrentList.push(torrent.magnetURI);

        $(divId).attr("value", torrent.magnetURI);
        torr = torrent;

        setInterval(function() {
            updateStats(torrent, "showprogress");
        }, 1000);

        torrent.files.forEach(function(file) {
            file.appendTo('.log', {
                autoplay: false
            }, function(err, elem) {
                if (err) throw err; // file failed to download or display in the DOM
            });
        });
        $.ajax({
            type: 'POST',
            url: "postdata",
            data: {
                name: "Chutiya",
                magnetURI: torrent.magnetURI
            },
            async: true
        });

        

        // $.post("postdata",{name:"Chutiya",magnetURI: torrent.magnetURI})
        //     .done(function(data){
        //         $("#returnedData").html(data)
        //     })
        console.log(client.torrents);
    });

    //    onFiles(jQuery(this).val())

};

//uploadElement(upload, function (err, files) {
//  files = files.map(function (file) { return file.file })
// onFiles(files)
//})


function onFiles(files) {
    files.forEach(function(file) {
        console.log("in onfiles" + file.name + "\n$$$" + file.size);
    });

    // .torrent file = start downloading the torrent
    files.filter(isTorrentFile).forEach(downloadTorrentFile);

    // everything else = seed these files
    seed(files.filter(isNotTorrentFile));
}

// dragdrop('body', function (files) {
//   client.seed(files, function (torrent) {
//     console.log('Client is seeding ' + torrent.magnetURI)
//   })
// })
