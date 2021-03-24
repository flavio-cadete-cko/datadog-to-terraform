'use strict';

export function exportFile(terraformCode, filename) {
    var blob = new Blob(terraformCode, { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url: url,
        filename: `${filename}.tf`
    });
}