const plist = require('plist');

function extractDisplayState(zip) {
    const entry = zip.getEntry('display_state.plist');

    if (!entry) {
        console.warn('⚠️ display_state.plist not found');
        return null;
    }

    try {
        const plistContent = entry.getData().toString('utf8');
        const json = plist.parse(plistContent);
        return json;
    } catch (err) {
        console.error('❌ Error parsing display_state.plist:', err);
        return null;
    }
}

module.exports = { extractDisplayState };