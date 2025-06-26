const AdmZip = require('adm-zip');
const path = './sample-data/example-map.itmz';  // replace with your actual .itmz file path

const zip = new AdmZip(path);
const zipEntries = zip.getEntries();

console.log('Files inside .itmz:');
zipEntries.forEach(entry => {
  console.log(entry.entryName);
});