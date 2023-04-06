var cpb = require("../lib/cpb.js");
var file = require('read-file');
var cheerio = require('cheerio');
var request = require('request');
var nock = require("nock");

global.CPB = cpb.CPB;

describe("getRows function", function () {
  it("should return 5 Torrent objects", function () {
    spyOn(cheerio, "load").andReturn(file.readFileSync('./tests/sources/cpasbien.html'));
    var callback = function(listTorrents) {
        console.log(listTorrent.size());
        expect(listTorrent.size()).toBe(5);
    }
    var listTorrent = global.CPB.getListTorrents(global.CPB.CATEGORIES.MOVIES, global.CPB.ORDERS.SEEDERS.DES, global.CPB.QUALITY.ALL, 5);
  });
});
