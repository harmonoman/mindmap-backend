const AdmZip = require('adm-zip');
const { extractMapdata } = require('./extractMapdata');
const { extractStyle } = require('./extractStyle');
const { extractManifest } = require('./extractManifest');
const { extractPreferences } = require('./extractPreferences');
const { extractDisplayState } = require('./extractDisplayState');
const { extractAssets } = require('./extractAssets');

function extractAll(itmzFilePath) {
    if (!itmzFilePath || typeof itmzFilePath !== 'string') {
        throw new Error('Invalid or missing .itmz file path');
    } 

    const zip = new AdmZip(itmzFilePath);

    const mapdata = extractMapdata(zip);
    const style = extractStyle(zip);
    const manifest = extractManifest(zip);
    const preferences = extractPreferences(zip);
    const displayState = extractDisplayState(zip);
      const assets = extractAssets(zip);

    return {
        mapdata,
        style,
        manifest,
        preferences,
        displayState,
        assets
    };
}

module.exports = { extractAll };