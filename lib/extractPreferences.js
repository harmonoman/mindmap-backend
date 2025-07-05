const plist = require('plist');

function extractPreferences(zip) {
    const entry = zip.getEntry('preferences.plist');

    if (!entry) {
        console.warn('⚠️ preferences.plist not found');
        return null;
    }

    try {
        const plistContent = entry.getData().toString('utf8');
        const json = plist.parse(plistContent);
        return json;
    } catch (err) {
        console.error('❌ Error parsing preferences.plist:', err);
        return null;
    }
}

module.exports = { extractPreferences };