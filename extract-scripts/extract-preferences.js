const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const plist = require('plist');

// Path to the .itmz file
const itmzFilePath = './sample-data/example-map.itmz';

// Ensure the output folder exists
const outputDir = path.join(__dirname, '../extracted-data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const zip = new AdmZip(itmzFilePath);
const preferencesEntry = zip.getEntry('preferences.plist');

if(!preferencesEntry) {
    console.error('❌ preferences.plist not found in .itmz file');
    process.exit(1);
}

const plistContent = preferencesEntry.getData().toString('utf8');

// Save raw plist (optional)
const plistOutputPath = path.join(__dirname, '../extracted-data/preferences_extracted.plist');
fs.writeFileSync(plistOutputPath, plistContent);
console.log(`preferences.plist extracted and saved to ${plistOutputPath}`);

// Parse plist to JSON
let json;

try{
    json = plist.parse(plistContent);
} catch (err) {
    console.error('❌ Error parsing preferences.plist:', err);
    process.exit(1);
}

// Save JSON
const jsonOutputPath = path.join(__dirname, '../extracted-data/preferences_extracted.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(json, null, 2));
console.log(`✅ preferences JSON saved to ${jsonOutputPath}`);