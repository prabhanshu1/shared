var client = new WebTorrent();
var torr;
var fileStore = {};
var emailStore= {};
var friendStore={};
var torrentList =[];
var intervalList={};
var seederDivNo=1;
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
    test=div;
    console.log(div)
    var fileList= div.children[0].children.upload.files;
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
    var email= div.children[0].children.email.value;
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

function addSeederDiv(){

    var tt=document.getElementById("seeder");
    var cln=tt.cloneNode(true);
    cln.id="seeder"+seederDivNo;
    cln.children[0].children.selectedEmails.innerHTML="";
    cln.children[0].children.summary.innerHTML="Click To Expand"
    cln.children[0].children.email.value=""
    cln.children[0].children.friendsToAdd.innerHTML="";
    cln.children[0].children.showProgress.innerHTML="";
    cln.children[0].children.log.innerHTML="";
    document.getElementById('container').appendChild(cln);

    seederDivNo=seederDivNo+1;
}

function addFriends(div) {
    var friend= div.children[0].children.email.value;
    if ($.inArray(friend,friendStore[div.id]) != -1)
    {
        alert("Friend: "+friend+" Already Added to Friend List");
        return;
    }
    if(typeof friendStore[div.id] === "undefined") {
        friendStore[div.id]=[];
    }
    friendStore[div.id].push(friend);
    showFriendsxxx(div);
}

function stopSeeding(div) {
    client.remove($(div).attr("value"));
    $(div.children.log).empty()
    console.log("deleted log")
}


function startSeeding(div) {

    client.seed(fileStore[div.id], function(torrent) {
        torrentList.push(torrent.magnetURI);

        $(div).attr("value", torrent.magnetURI);
        torr = torrent;
        console.log("logging div")
        console.log(div)
        if(typeof intervalList[div.id] !== "undefined")
        {
            clearInterval(intervalList[div.id]);
        }
        interval=setInterval(function() {
            updateStats(torrent,div);
        }, 1000);
        intervalList[div.id]=[];
        intervalList[div.id].push(interval);
        torrent.files.forEach(function(file) {
            file.appendTo($(div.children[0].children.log)[0], {
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
                magnetURI: torrent.magnetURI,
                'friendsList[]':friendStore[div.id]
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
