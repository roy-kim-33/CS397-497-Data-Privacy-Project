chrome.devtools.panels.create("My Panel", null, "devtools.html", function (panel) {
    // Code to be executed when the panel is created
    console.log("\n\nhere\n\n");
    chrome.devtools.network.onRequestFinished.addListener(function (request) {
        chrome.devtools.network.getHAR(function (result) {
            var entries = result.entries;
            entries.forEach(function (entry) {
                if (entry.request.url === request.request.url) {
                    console.log(entry.response.headers);
                    console.log(entry.response.cookies);
                }
            });
        });
    });
});
