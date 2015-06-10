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
        this.url = url;
        this.max_per_page = max_per_page;
        this.url_cat = "view_cat.php?categorie=";
        this.url_search = "recherche/";
    }
    //
    // export the class
CPB.prototype.getListTorrents = function (category, order, quality, limit=0) {
    url = "view_cat.php?categorie=" + category + "&trie=" + order;
    return this._get_rows(limit=limit, url=url, list_quality=quality, category=category);
}
CPB.prototype._getHTML = function (url, page) {
    if (url.indexOf('?') === -1) {
        url += "/page-" + str(page);
    } else {
        url += "&page=" + str(page);
    }
    request('http://www.cpasbien.pw/view_cat.php?categorie=films', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            return $;
        }
    });
}
CPB.prototype.search = function (url, quality, query) {
    url_search = url + query;
    return this._getRows()
}
CPB.prototype._getTorrentLink = function (url) {
    filename =  url.split('/').pop()
    console.log(filename)
    return this.url + 'telechargement/' + filename + '.torrent'
}
CPB.prototype._getMaxPage = function () {
}
CPB.prototype._getLastIndexTitle = function () {
    for index, w in enumerate(tab_title):
        if w.isupper() and index>0 :
            return index
}
CPB.prototype._getName = function () {
    last_index_title = self._get_last_index_title(tab_title)
    return ' '.join(tab_title[:last_index_title])
}
CPB.prototype._getQuality = function () {
    for index, w in enumerate(tab_title):
        if w.upper() in quality:
            index_quality = index
            break

        return tab_title[index_quality]
}
CPB.prototype._getSeasonEpisode = function () {
    title_last_idx = self._get_last_index_title(tab_title)
    while tab_title[title_last_idx][0].upper() != 'S' or tab_title[title_last_idx][3].upper() != 'E':
        title_last_idx +=1


    season = int(tab_title[title_last_idx][1:3])
    episode = int(tab_title[title_last_idx][4:6])

    return season, episode
}
CPB.prototype._getRows = function () {
    $('.ligne0, .ligne1').each(function (i, element) {
        var name = $(this).children('a');
        var link = name.attr("href");
        var seeders = $(this).children(".up");
        var leechers = $(this).children(".down");
        var size = $(this).children(".poid");
        console.log(name.text());
        console.log(link);
        console.log(seeders.text());
        console.log(leechers.text());


    });
}


var CATEGORIES = {
        MOVIES : "films",
        SHOWS : "series",
        MUSIC : "musique",
        EBOOK : "ebook",
        SOFTWARE : "logiciels",
        PC_GAME : "jeux-pc",
        CONSOLE_GAME : "jeux-consoles"
};

var QUALITY = {
        ALL : ['DVDSCR', 'DVDRIP', 'HDTV', '720P', '1080P',
            'WEBRIP'],
        GOOD : [
        'DVDRIP', 'HDTV', '720P', '1080P',
        'WEBRIP'
        ],
        BEST : ['HDTV', '720P', '1080P']
};

function ORDERS() {
    function SEEDERS() {
        DES : "seeds-d";
        ASC : "seeds-a";
    }

    function LEECHERS() {
        DES : "leechs-d";
        ASC : "leechs-a";
    }

    function DATE() {
        DES : "date-d";
        ASC : "date-a";
    }

    function NAME() {
        DES = "nom-d";
        ASC = "nom-a";
    }

    function SIZE() {
        DES = "poid-d";
        ASC = "poid-a";
    }


}
