var CACHE_PERCENT = 3;

var torrentDir = 'torrent-stream';
var torrentStream = require('torrent-stream');
var path = require('path');



var engine = torrentStream('magnet:?xt=urn:btih:130C1E9D107B96D6E63DC7FE5EBF1EE59AF044E1&dn=Elysium+%282013%29+%5B1080p%5D&tr=http%3A%2F%2Ftracker.yify-torrents.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.org%3A80&tr=udp%3A%2F%2Ftrackr.sytes.net%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337');

engine.on('ready', function() {
    var fileToPlay = null;
    console.log('engine:', engine);
    engine.files.forEach(function(file) {
        console.log('filename:', file.name);
        // get the biggest file
        if ((fileToPlay === null || fileToPlay.length < file.length)) {
            fileToPlay = file
        }
    });
    console.log('filetoPlay:', path.join(this.path, fileToPlay.path));

    var video = videojs('video');
    var stream = fileToPlay.createReadStream();

    var cache = 0;
    // check size downloaded then play
    cache = setInterval(function() {
        var percent = engine.swarm.downloaded * 100 / stream.length;
        console.log('percent:', percent);
        if (percent >= CACHE_PERCENT) {
            video.src(path.join(engine.path, fileToPlay.path));
            video.play();
            clearInterval(cache);

        }

    }, 3000);


});
