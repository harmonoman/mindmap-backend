const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

// Replace this with your actual .itmz path
const itmzFilePath = './sample-data/example-map.itmz';

// Ensure the output folder exists
const outputDir = path.join(__dirname, '../extracted-data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const zip = new AdmZip(itmzFilePath);
const mapdataEntry = zip.getEntry('mapdata.xml');

if (!mapdataEntry) {
  console.error('mapdata.xml not found in .itmz file');
  process.exit(1);
}

const xmlContent = mapdataEntry.getData().toString('utf8');

// Save XML (optional)
const xmlOutputPath = path.join(__dirname, '../extracted-data/mapdata_extracted.xml');
fs.writeFileSync(xmlOutputPath, xmlContent);
console.log(`mapdata.xml extracted and saved to ${xmlOutputPath}`);

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
const jsonOutputPath = path.join(__dirname, '../extracted-data/mapdata_extracted.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(json, null, 2));
console.log(`✅ mapdata JSON saved to ${jsonOutputPath}`);