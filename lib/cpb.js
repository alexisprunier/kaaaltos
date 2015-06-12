var request = require('request');
var cheerio = require('cheerio');

function Torrent(name, link, seeders, leechers, size, season, episode, quality, category) {
    this.name = name;
    this.link = link;
    this.seeders = seeders;
    this.leechers = leechers;
    this.size = size;
    this.season = season;
    this.episode = episode;
    this.quality = quality;
    this.category = category;
}

function CPB(url, max_per_page, url_cat, url_search) {
    this.url = 'http://www.cpasbien.pw/';
    this.max_per_page = 30;
    this.url_cat = "view_cat.php?categorie=";
    this.url_search = "recherche/";

    this.CATEGORIES = {
        MOVIES: "films",
        SHOWS: "series",
        MUSIC: "musique",
        EBOOK: "ebook",
        SOFTWARE: "logiciels",
        PC_GAME: "jeux-pc",
        CONSOLE_GAME: "jeux-consoles"
    };

    this.QUALITY = {
        ALL: ['DVDSCR', 'DVDRIP', 'HDTV', '720P', '1080P',
                'WEBRIP'],
        GOOD: [
            'DVDRIP', 'HDTV', '720P', '1080P',
            'WEBRIP'
            ],
        BEST: ['HDTV', '720P', '1080P']
    };

    this.ORDERS = {
        SEEDERS: {
            DES: "seeds-d",
            ASC: "seeds-a"
        },

        LEECHERS: {
            DES: "leechs-d",
            ASC: "leechs-a"
        },

        DATE: {
            DES: "date-d",
            ASC: "date-a"
        },

        NAME: {
            DES: "nom-d",
            ASC: "nom-a"
        },

        SIZE: {
            DES: "poid-d",
            ASC: "poid-a"
        }
    }
}

CPB.prototype.eventGetRows = function (lf) {}
CPB.prototype.setEventGetRows = function (func) {
    CPB.prototype.eventGetRows = func
}

CPB.prototype.getHTML = function (url, page) {

}

CPB.prototype.getTorrentLink = function (url) {
    filename = url.split('/').pop();
    return (this.url + 'telechargement/' + filename + '.torrent');
}

CPB.prototype.getMaxPage = function () {}

var getLastIndexTitle = function (tabTitle) {
    var value = null;
    var lastIndex = null;
    var len = tabTitle.length;

    for (var i = 0; i < len; i++) {
        value = tabTitle[i];
        if (value === value.toUpperCase() && i > 1) {
            return i;
        }
    }
}

var getName = function (tabTitle) {
    var tabName;
    var lastIndex;

    lastIndex = getLastIndexTitle(tabTitle);
    tabName = tabTitle.slice(0, lastIndex);
    return tabName.join(' ');
}

/*
var getSeasonEpisode = function () {
    title_last_idx = self._get_last_index_title(tab_title)
    while tab_title[title_last_idx][0].upper() != 'S' or tab_title[title_last_idx][3].upper() != 'E':
        title_last_idx +=1


    season = int(tab_title[title_last_idx][1:3])
    episode = int(tab_title[title_last_idx][4:6])

    return season, episode
}*/

var getQuality = function (tabTitle, quality) {
    var value = null;
    var indexQuality = null;
    var len = tabTitle.length;
    for (var i = 0; i < len; i++) {
        value = tabTitle[i];
        //if is upper and in quality
        if (value === value.toUpperCase() && quality.indexOf(value) >= 0) {
            return tabTitle[i];
        }
    }
    console.log('ERROR', 'getQuality');
}
CPB.prototype.getRows = function (url, limit, page, list_quality, category) {
    var name, link, seeders, leechers, size, quality, season, episode;
    var list = [];

    season = null;
    episode = null;

    if (url.indexOf('?') === -1) {
        url += "/page-" + (page);
    } else {
        url += "&page=" + (page);
    }
    console.log('url', url);
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('.ligne0, .ligne1').each(function (i, element) {
                var tor;
                oName = $(this).children('a');
                name = oName.text();
                tabName = name.split(' ');
                cleanName = getName(tabName);

                quality = getQuality(tabName, list_quality);
                link = oName.attr("href");
                seeders = ($(this).children(".up")).text();
                leechers = ($(this).children(".down")).text();
                size = ($(this).children(".poid")).text();
                tor = new Torrent(cleanName, link, seeders, leechers, size, season, episode, quality, category);
                list.push(tor);

            });
            console.log(list);
            CPB.prototype.eventGetRows(list);
        } else {
            console.log('erreur', 'request');
        }
    });

}

CPB.prototype.search = function (query, category, quality, limit) {
    url_search = this.url + this.url_search + query;
    return this.getRows(url_search, limit, 0, quality, category);
}

CPB.prototype.getListTorrents = function (category, order, quality, limit) {
    limit = typeof limit !== 'undefined' ? limit : 0;
    var url = this.url + "view_cat.php?categorie=" + category + "&trie=" + order;

    this.getRows(url, limit, 0, quality, category);
}


exports.CPB = new CPB();
exports.Torrent = new Torrent;
