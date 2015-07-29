var t411Downloader = new T411Downloader();

chrome.browserAction.onClicked.addListener(t411Downloader.start.bind(t411Downloader));

