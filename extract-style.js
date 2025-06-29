const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

// Replace this with your actual .itmz path
const itmzFilePath = './sample-data/example-map.itmz';

const zip = new AdmZip(itmzFilePath);
const styleEntry = zip.getEntry('style.xml');

if (!styleEntry) {
  console.error('style.xml not found in .itmz file');
  process.exit(1);
}

const xmlContent = styleEntry.getData().toString('utf8');

// Save XML (optional)
const xmlOutputPath = path.join(__dirname, 'style_extracted.xml');
fs.writeFileSync(xmlOutputPath, xmlContent);
console.log(`style.xml extracted and saved to ${xmlOutputPath}`);

// Parse to JSON
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
});

let json;

try {
    json = parser.parse(xmlContent);
} catch (err) {
    console.error('Error parsing XML:', err);
    process.exit(1);
}

// Save JSON
const jsonOutputPath = path.join(__dirname, 'style_extracted.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(json, null, 2));
console.log(`✅ style JSON saved to ${jsonOutputPath}`);
