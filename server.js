console.log('Running server.js at:', __filename);

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const AdmZip = require('adm-zip');
const { XMLParser } = require('fast-xml-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('GET request works!');
});

app.post('/test', (req, res) => {
  res.send('POST route works!');
});

app.get('/', (req, res) => {
  res.send('Mindmap Backend Running');
});

const upload = multer({ dest: 'uploads/' });

// Display contents of mapdata.xml
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const zip = new AdmZip(file.path);
    const mapdataEntry = zip.getEntry('mapdata.xml');

    const zipEntries = zip.getEntries();
    zipEntries.forEach(e => console.log(e.entryName));

    if (!mapdataEntry) {
      return res.status(400).send('mapdata.xml not found in .itmz file');
    }

    const xml = mapdataEntry.getData().toString('utf8');
    const parser = new XMLParser();
    const json = parser.parse(xml);

    res.json({ parsed: json });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing file');
  }
});

// Get and serve an image from the map
app.get('/image/:id', (req, res) => {
  const imageId = req.params.id.trim();
  const itmzFile = './sample-data/example-map.itmz';

  console.log(`Requested image id: '${imageId}'`);

  console.log(`🔍 Attempting to open ${itmzFile}`);
  const zip = new AdmZip(itmzFile);

  const entryPath = `assets/${imageId}/image.png`;
  console.log(`🔎 Looking for image at: ${entryPath}`);

  const imageEntry = zip.getEntry(entryPath);

  if (!imageEntry) {
    console.log(`❌ Image not found at ${entryPath}`);
    return res.status(404).send('Image not found');
  }

  const imageData = imageEntry.getData();
  res.set('Content-Type', 'image/png');
  res.send(imageData);
});

// Get and serve the preview image of the map
app.get('/preview/:mapId', (req, res) => {
    const mapId = req.params.mapId.trim();
    const itmzFile = `./sample-data/${mapId}.itmz`;
  
    console.log(`🔍 Attempting to open preview from ${itmzFile}`);
  
    try {
      const zip = new AdmZip(itmzFile);
      const previewEntry = zip.getEntry('preview.png');
  
      if (!previewEntry) {
        console.log(`❌ preview.png not found in ${itmzFile}`);
        return res.status(404).send('Preview not found');
      }
  
      const previewData = previewEntry.getData();
      res.set('Content-Type', 'image/png');
      res.send(previewData);
    } catch (err) {
      console.error('Error reading preview:', err);
      res.status(500).send('Error processing preview');
    }
  });

// Serve dynamically parsed mindmap from example-map.itmz
app.get('/full_map.json', (req, res) => {
  const itmzFile = path.join(__dirname, 'sample-data', 'example-map.itmz');
  console.log('itmzFile:', itmzFile);

  try {
    const zip = new AdmZip(itmzFile);
    const mapdataEntry = zip.getEntry('mapdata.xml');

    if (!mapdataEntry) {
      console.log('❌ mapdata.xml not found in .itmz file');
      return res.status(404).send('mapdata.xml not found');
    }

    const xml = mapdataEntry.getData().toString('utf8');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const json = parser.parse(xml);
    console.log('Parsed JSON:', JSON.stringify(json, null, 2));

    res.json(json);

    console.log('✅ Served fresh full_map.json from .itmz');

  } catch (err) {
    console.error('❌ Error parsing .itmz:', err);
    res.status(500).send('Error processing .itmz file');
  }
});

// ✅ app.listen should always be LAST
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});