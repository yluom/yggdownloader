var yggDownloader = new YGGDownloader();

chrome.browserAction.onClicked.addListener(yggDownloader.start.bind(yggDownloader));

