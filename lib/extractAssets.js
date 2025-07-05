const path = require('path');

function extractAssets(zip) {
    const assets = {};
    const entries = zip.getEntries();

    entries.forEach(entry => {
        if (entry.entryName.startsWith('assets/') && !entry.isDirectory) {
            const parts = entry.entryName.split('/'); // assets/{id}/filename
            const assetId = parts[1];
            const filename = parts.slice(2).join('/');

            if (!assets[assetId]) {
                assets[assetId] = [];
            }

            assets[assetId].push({
                filename,
                data: entry.getData() // Buffer
            });
        }
    });

    return assets;
}

module.exports = { extractAssets };