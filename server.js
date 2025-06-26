console.log('Running server.js at:', __filename);

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const AdmZip = require('adm-zip');
const { XMLParser } = require('fast-xml-parser');

const app = express();
const port = 4000;

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

// ✅ app.listen should always be LAST
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});