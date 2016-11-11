var client = new WebTorrent();
var torr;
var fileStore = {};
var emailStore= {};
var torrentList =[];
var test;
window.setInterval(function(){
    $.ajax({
        type: 'POST',
        url: "updatedata",
        data: {'torrent[]': torrentList },
        async: true
    });
}, 10000);

function addFiles(div) {
    //test=div;
    var fileList= div.children.upload.files;
    // if ($.inArray(fileList,fileStore[div.id]) != -1)
    // {
    //     alert("Files: "+fileList+" Already Added to file List");
    //     return;
    // }
    if(typeof fileStore[div.id] === "undefined") {
        fileStore[div.id]=[];
    }
    fileStore[div.id].push.apply(fileStore[div.id], fileList);
    showFilesxxx(div);
}

function addEmails(div) {
    var email= div.children.email.value;
    if ($.inArray(email,emailStore[div.id]) != -1)
    {
        alert("Email: "+email+" Already Added to Email List");
        return;
    }
    if(typeof emailStore[div.id] === "undefined") {
        emailStore[div.id]=[];
    }
    emailStore[div.id].push( email);
    showEmailsxxx(div);
}

function stopSeeding(divId) {
    client.remove($(divId).attr("value"));
}


function startSeeding(div) {

    client.seed(fileStore[div.id], function(torrent) {
        torrentList.push(torrent.magnetURI);

        $(div).attr("value", torrent.magnetURI);
        torr = torrent;
        console.log("logging div")
        console.log(div)
        setInterval(function() {
            updateStats(torrent,div);
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
                'emailList[]':emailStore[div.id],
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
