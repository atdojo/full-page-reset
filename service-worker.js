chrome.action.onClicked.addListener(async (tab) => {
    await removeBrowsingDataForOrigins([new URL(tab.url).origin])
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => location.reload(true)
    })
})
async function removeBrowsingDataForOrigins(origins) {
    new Promise((resolve, reject) => {
        chrome.browsingData.remove({ origins }, {
            cacheStorage: true,
            cookies: true,
            fileSystems: true,
            indexedDB: true,
            localStorage: true,
            serviceWorkers: true,
            webSQL: true
        }, resolve) // check for error if needed, right now it does not matter. if (chrome.runtime.lastError)
    })
}