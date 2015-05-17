/**
 * @constructor
 */
T411Downloader = function() {};


/**
 * Starts the whole process of downloading.
 * @param {chrome.windows.Tab} tab The tab from which the action was triggered.
 */
T411Downloader.prototype.start = function(tab) {
  console.log('Starting download');
  chrome.tabs.query({
    url: 'http://*.t411.io/*'}, this.onTabsAvailable.bind(this));
};


T411Downloader.prototype.onTabsAvailable = function(tabs) {
  console.log('Got ' + tabs.length + ' relevant tabs!');
}
