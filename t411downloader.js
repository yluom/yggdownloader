/**
 * @constructor
 */
T411Downloader = function() {};


/**
 * Starts the whole process of downloading.
 * @param {chrome.windows.Tab} tab The tab from which the action was triggered.
 */
T411Downloader.prototype.start = function(tab) {
  chrome.tabs.query({
    url: 'http://*.t411.io/*'}, this.onTabsAvailable.bind(this));
};


T411Downloader.prototype.onTabsAvailable = function(tabs) {
  for (var tab, i = 0; tab = tabs[i]; i++) {
    chrome.tabs.executeScript(tab.id, {
      code: "var merciElements = document.getElementsByClassName('btn call');" +
            "if (merciElements.length) { var merciBtn = merciElements[0]; merciBtn.click(); }" +
            "var starElements = document.getElementsByClassName('ui-stars-star');" +
            "if (starElements.length == 5) { starElements[4].click(); }" +
            "var buttons = document.getElementsByClassName('btn');" +
            "var urlToDownload;" +
            "for (var btn, j = 0; btn = buttons[j]; j++) {" +
            "  if (/.*charger.*/.test(btn.textContent)) {" +
            "    if (btn.href) {" +
            "      urlToDownload = btn.href;" +
            "    }" +
            "  }" +
            "}" +
            "'' + " + tab.id + " + '!#~' + urlToDownload"   // Last statement gets returned.
    }, function(hrefArray) {
      if (!!hrefArray && !!hrefArray[0]) {
        var components = hrefArray[0].split('!#~', 2);
        if (!!components[1] && components[1] != 'undefined') {
          var closeFnPartial = function(tabId) { chrome.tabs.remove(tabId); }.bind(null, parseInt(components[0], 10));
        // Close the tab once the download is over.
          chrome.downloads.download({url: components[1]}, closeFnPartial);
        }
      }
    });
  }
}
