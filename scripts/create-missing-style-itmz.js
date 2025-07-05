const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const sourceItmz = path.join(__dirname, '../sample-data/example-map.itmz');
const fixturesDir = path.join(__dirname, '../fixtures');
const targetItmz = path.join(fixturesDir, 'missing-style.itmz');

// Ensure output dir exists
if (!fs.existsSync(fixturesDir)) {
  fs.mkdirSync(fixturesDir);
}

// Load and modify zip
const zip = new AdmZip(sourceItmz);
zip.deleteFile('style.xml');
zip.writeZip(targetItmz);

console.log('✅ Created missing-style.itmz without style.xml');