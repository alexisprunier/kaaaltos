var CACHE_PERCENT = 3;

var torrentDir = 'torrent-stream';
var torrentStream = require('torrent-stream');
var path = require('path');
var cpb = require('./lib/cpb.js');
var Trakt = require('trakt-api');
var trakt = Trakt('515a27ba95fbd83f20690e5c22bceaff0dfbde7c ');

global.CPB = cpb.CPB;

global.CPB.setEventGetRows(function (listTorrents) {
    $('.movie-list').empty();

    var mergedListTorrent = [];
    var torrentListNames = [];
    for (i = 0; i < listTorrents.length; i++) {
        console.log(listTorrents[i]);
        if (torrentListNames.indexOf(listTorrents[i].name.toUpperCase()) == -1) {
            mergedListTorrent.push(listTorrents[i]);
            torrentListNames.push(listTorrents[i].name.toUpperCase());
        }
    }

    for (i = 0; i < mergedListTorrent.length; i++) {
        trakt.searchAll(mergedListTorrent[i].name).then(function(result) {
            $(".movie-list").append('<div class="movie-survey"><img alt="Movie" src="' + (result[0].length == 0 ? "" : result[0].movie.images.poster.thumb) + '" />' + result[0].movie.title + '</div>');
            console.log(result);
        }).catch(function(error){console.log('error', error)});
    }
});



$("#refresh").on("click", function () {
    global.CPB.getListTorrents(global.CPB.CATEGORIES.MOVIES, global.CPB.ORDERS.SEEDERS.DES, global.CPB.QUALITY.GOOD, 5);
});

/* NAVIGATION */
$('.movie-list .movie-survey').on('click', function () {
    $('.movie-list').css('display', 'none');
    $('.movie-detail').css('display', 'block');
});

$('.back-to-list').on('click', function () {
    $('.movie-list').css('display', 'block');
    $('.movie-detail').css('display', 'none');
});

$('#search').on('keypress', function (event) {
    if (event.which == 13 && !event.shiftKey) {
        event.preventDefault();
        global.CPB.search($('#search').val(), global.CPB.CATEGORIES.MOVIES, global.CPB.QUALITY.ALL, 100);
    }
});


global.CPB.getListTorrents(global.CPB.CATEGORIES.MOVIES, global.CPB.ORDERS.SEEDERS.DES, global.CPB.QUALITY.GOOD, 5);

/* END NAVIGATION */

/*

var engine = torrentStream('magnet:?xt=urn:btih:64F7F9E5E328C0D164C03C117B6DA9FB764A3B97&dn=The+Hunger+Games+Mockingjay+Part+1+2014+FRENCH+720p+BluRay+x264-PRiDEHD&udp://tracker.openbittorrent.com:80/announce&udp://open.demonii.com:1337');

request('http://www.omgtorrent.com/films/?order=top', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
    }
})


engine.on('ready', function () {
    var fileToPlay = null;
    console.log('engine:', engine);
    engine.files.forEach(function (file) {
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
    cache = setInterval(function () {
        var percent = engine.swarm.downloaded * 100 / stream.length;
        console.log('percent:', percent);
        if (percent >= CACHE_PERCENT) {
            // TODO : set video format
            video.src(path.join(engine.path, fileToPlay.path));
            video.play();
            clearInterval(cache);

        }

    }, 3000);


    request({
        method: 'GET',
        url: 'https://api-v2launch.trakt.tv/movies/tron-legacy-2010/ratings',
        headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': '515a27ba95fbd83f20690e5c22bceaff0dfbde7c '
        }
    }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
    });

});*/
