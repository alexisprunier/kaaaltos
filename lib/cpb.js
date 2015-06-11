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

CPB.prototype.eventGetRows = function (lf) {console.log('info', 'eventGetRows n est pas paramétré')}
CPB.prototype.setEventGetRows = function (func) {CPB.prototype.eventGetRows = func}

CPB.prototype.getHTML = function (url, page) {

}

CPB.prototype.getTorrentLink = function (url) {
    filename = url.split('/').pop();
    console.log(filename);
    return (this.url + 'telechargement/' + filename + '.torrent');
}

CPB.prototype.getMaxPage = function () {}

/*var getLastIndexTitle = function (tab_title) {
    for index, w in enumerate(tab_title):
        if w.isupper() and index>0 :
            return index
}

var getName = function (tab_title) {
    last_index_title = self._get_last_index_title(tab_title)
    return ' '.join(tab_title[:last_index_title])
}

var getQuality = function (tab_title, quality) {
    for index, w in enumerate(tab_title):
        if w.upper() in quality:
            index_quality = index
            break

        return tab_title[index_quality]
}

var getSeasonEpisode = function () {
    title_last_idx = self._get_last_index_title(tab_title)
    while tab_title[title_last_idx][0].upper() != 'S' or tab_title[title_last_idx][3].upper() != 'E':
        title_last_idx +=1


    season = int(tab_title[title_last_idx][1:3])
    episode = int(tab_title[title_last_idx][4:6])

    return season, episode
}*/
CPB.prototype.getRows = function (url, limit, page, list_quality, category) {
    var name, link, seeders, leechers, size;

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
                name = $(this).children('a');
                link = name.attr("href");
                seeders = $(this).children(".up");
                leechers = $(this).children(".down");
                size = $(this).children(".poid");
                /*console.log(name.text());
                console.log(link);
                console.log(seeders.text());
                console.log(leechers.text());*/
            });
            console.log('name', name);
            CPB.prototype.eventGetRows(['alexis', 'anthony', 'zuzu']);
        } else {
            console.log('erreur', 'request');
        }
    });
}

CPB.prototype.search = function (url, quality, query) {
    url_search = url + query;
    return this.getRows()
}

CPB.prototype.getListTorrents = function (category, order, quality, limit) {
    limit = typeof limit !== 'undefined' ? limit : 0;
    var url = this.url + "view_cat.php?categorie=" + category + "&trie=" + order;

    console.log('return', this.getRows(url, limit, 0, quality, category));
}


exports.CPB = new CPB();
exports.Torrent = new Torrent;
