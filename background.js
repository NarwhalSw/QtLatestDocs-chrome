// Copyright (c) 2015 Narwhal Software s.r.l. 
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.
var pattern = /^(https?:\/\/)((doc-snapshots.qt.io)|(doc.qt.io))\/([^\/]+)\/(.*)/

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '^https?://((doc-snapshots.qt.io)|(doc.qt.io))/(qt)?[-0-9.]+/(.+)$' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
    var match = pattern.exec(tab.url);
    var newUrl = match[1] + "doc-snapshots.qt.io/qt5-dev/" + match[6].toLowerCase();
    chrome.tabs.update(tab.id, {url: newUrl});
});