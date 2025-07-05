const plist = require('plist');

function extractManifest(zip) {
    const entry = zip.getEntry('manifest.plist');

    if (!entry) {
        console.warn('⚠️ manifest.plist not found');
        return null;
    }

    try {
        const plistContent = entry.getData().toString('utf8');
        const json = plist.parse(plistContent);
        return json;
    } catch (err) {
        console.error('❌ Error parsing manifest.plist:', err);
        return null;
    }
}

module.exports = { extractManifest };