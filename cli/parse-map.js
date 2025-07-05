const path = require('path');
const AdmZip = require('adm-zip');
const { extractAll } = require('../lib/extractAll.js');
const fs = require('fs');

// Command-line argument handling
const [, , inputFile] = process.argv;

// Input validation
if (!inputFile) {
    console.error('❌ Usage: node cli/parse-map.js <path-to-itmz>');
    process.exit(1);
}

// Resolve the file path
const itmzFilePath= path.resolve(inputFile);

// Run full extraction
console.log(`Extracting from ${itmzFilePath}`);

const result = extractAll(itmzFilePath);

// Output to condole
console.log("Full extraction result:");
console.dir(result, { depth: null });

// Save to file
const outputPath = path.join(__dirname, '../extracted-data/full_map.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

// Done notification
console.log(`✅ FUll map saved to ${outputPath}`);