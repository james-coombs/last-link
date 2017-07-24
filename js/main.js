function getLastLink() {
    var historicalLastLink = '';

    chrome.history.search({text: '', maxResults: 2}, function(data) {
        historicalLastLink = data[1].url;

        var script =`
                        var scriptLastLink = '${historicalLastLink}';
                        var allAs = [].slice.call(document.querySelectorAll('a'));
                        //console.log(allAs);
                        allAs.forEach( function (a) {
                            if (a.href === scriptLastLink) {
                                console.log(a);
                                a.setAttribute("style", "background-color: #FF6600; color:#ffffff; border: 3px dotted #8A8282;");
                            }
                        });
                `;

        chrome.tabs.executeScript({
            code: script
        });
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    getLastLink();
});
