const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

// Replace this with your actual .itmz path
const itmzFilePath = './sample-data/example-map.itmz';

const zip = new AdmZip(itmzFilePath);
const mapdataEntry = zip.getEntry('mapdata.xml');

if (!mapdataEntry) {
  console.error('mapdata.xml not found in .itmz file');
  process.exit(1);
}

const xmlContent = mapdataEntry.getData().toString('utf8');

// Save to local file so you can open it in any text editor
const outputPath = path.join(__dirname, 'mapdata_extracted.xml');

fs.writeFileSync(outputPath, xmlContent);

console.log(`mapdata.xml extracted and saved to ${outputPath}`);