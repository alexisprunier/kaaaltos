
var torrentDir = 'torrent-stream';
var torrentStream = require('torrent-stream');
var path = require('path');

var engine = torrentStream('magnet:?xt=urn:btih:BB43CF1DC5B200BA37679DB96375A8190D933C2E&dn=Big+Hero+6+%282014%29+%5B720p%5D&tr=http%3A%2F%2Ftracker.yify-torrents.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.org%3A80&tr=udp%3A%2F%2Ftrackr.sytes.net%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337');

engine.on('ready', function() {
    var fileToPlay = null;
    console.log('engine:', engine);
    engine.files.forEach(function(file) {
        console.log('filename:', file.name);
        // get the biggest file and test if the format is playable
        if( (fileToPlay === null || fileToPlay.length < file.length)){
            fileToPlay = file;
        }

    });
    console.log('filetoPlay:', path.join(this.path, fileToPlay.path));

    var video = document.getElementById('video');
    video.setAttribute("src", path.join(this.path, fileToPlay.path) );


    var stream = fileToPlay.createReadStream();

    video.load();
    video.play();
});
