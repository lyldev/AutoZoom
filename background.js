// console.log("hello");
function handleTab(tabInfo) {
    var tabId = tabInfo.tabId;
    console.log("---newTabId: " + tabId);

    var defaultZoomFactor = 0;
    browser.tabs.getZoomSettings(tabId).then(
        result => {
            defaultZoomFactor = result.defaultZoomFactor;
            console.log("---defaultZoomFactor: " + defaultZoomFactor);
        }
    )
    browser.storage.local.get().then(
        result => {
            var zoomrate = 0;
            if ('zoomrate' in result) {
                zoomrate = parseFloat(result.zoomrate) / 100.0;
            }
            console.log("---zoomrate: " + zoomrate);
            if (zoomrate != defaultZoomFactor) {
                browser.tabs.setZoom(tabId, zoomrate)
                    .then(onSetZoom, onErrorZoom);
            }
        }
    );
}
function onSetZoomSettings() {
    console.log(`setZoomSettings`);
}

function onErrorZoomSettings(error) {
    console.log(`setZoomSettings(): ${error}`);
}

function onSetZoom() {
    console.log(`setZoom`);
}

function onErrorZoom(error) {
    console.log(`setZoom(): ${error}`);
}

browser.tabs.onActivated.addListener(handleTab);
browser.tabs.onUpdated.addListener(handleTab);

