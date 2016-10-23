

var client = new WebTorrent()

var upload = document.querySelector('input[name=upload]')
var fileList;
var files;
jQuery("input#upload").change(function () {

    fileList = document.getElementById("upload").files;

    
    //  var video=document.getElementById("ii");
    //video.src=window.URL.createObjectURL(fileList[0]);
    
    // files = fileList.map(function (file) { return file.file })
    // console.log("typeof files  "+typeof (files))
    // Object.prototype.toString.call(files)

    client.seed(fileList, function (torrent) {
        var $d=$("#data")
        $d.append("<p> Total Number of Files:  "+torrent.files.length)
        $d.append("<ul>")
        
        for(i=0;i<torrent.files.length;i++){
            $d.append("<li>"+torrent.files[i].name)
        }        
        $d.append("</ul>")
        $d.append("</p>")
        var interval = setInterval(function(){updateStats(torrent,"showprogress")}, 3000)
        torrent.files.forEach(function (file) {
            console.log(file)
            file.appendTo('.log',{autoplay:false}, function (err, elem) {
                if (err) throw err // file failed to download or display in the DOM
            })
        })
        console.log('Client is seeding ' + torrent.magnetURI)
        
    })

    //    onFiles(jQuery(this).val())
    
});

jQuery("input#fileid").change(function () {
    alert(jQuery(this).val())
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




