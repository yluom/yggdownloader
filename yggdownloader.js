/**
 * @constructor
 */
YGGDownloader = function () { };


/**
 * Starts the whole process of downloading.
 * @param {chrome.windows.Tab} tab The tab from which the action was triggered.
 */
YGGDownloader.prototype.start = function (tab) {
  chrome.tabs.query({
    url: "https://*.yggtorrent.li/*"
  }, this.onTabsAvailable.bind(this));
};


YGGDownloader.prototype.onTabsAvailable = function (tabs) {
  for (var tab, i = 0; tab = tabs[i]; i++) {
    var tabUrl = tab.url;

    // console.info("Found tab ="+tabUrl);
    // if it's not a yggtorrent url
    if (!tabUrl.includes("yggtorrent.li/torrent/")) {
      continue;
    }
    // console.info("Found ygg tab ="+tabUrl);
    // parse url to get torrent number
    // url looks like this https://www4.yggtorrent.li/torrent/filmvideo/animation-serie/735355-rick-and-morty-s04e10-multi-1080p-web-dl-x265
    // and we want to find the ID of the torrent (after the last /)
    var torrentInfo = tabUrl.substring(tabUrl.lastIndexOf("/") + 1); // parses url and return everything past the last "/"
    var torrentId = torrentInfo.substring(0, torrentInfo.indexOf("-")); // get torrent number
    //console.info("Found torrentid ="+torrentId);
    var dlLink = "https://www4.yggtorrent.li/engine/download_torrent?id=" + torrentId;

    //console.info("Found launching dl of  ="+dlLink);
    // Launch the download
    chrome.downloads.download({ url: dlLink });
    // close the tab
    chrome.tabs.remove(tab.id);
  }
}
