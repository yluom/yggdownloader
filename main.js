var t411Downloader = new T411Downloader();

// Set up a click handler so that we can tile all the windows.
chrome.browserAction.onClicked.addListener(t411Downloader.start.bind(t411Downloader));

