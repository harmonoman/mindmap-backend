const { XMLParser } = require('fast-xml-parser');

function extractMapdata(zip) {
    const entry = zip.getEntry('mapdata.xml');
    if (!entry) return null;
    const xml = entry.getData().toString('utf8');
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    return parser.parse(xml);
}
  
module.exports = { extractMapdata };