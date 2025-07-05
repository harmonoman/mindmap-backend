# mindmap-backend

A Node.js backend for parsing and serving data from **iThoughts (.itmz)** mind map files.
It extracts the full map structure (topics, styles, preferences, etc.), processes embedded assets, and provides a foundation for a future mind map renderer.

---

## 🚀 Features

✅ **Full .itmz Extraction**  
- Parse `mapdata.xml`, `style.xml`, `manifest.plist`, `preferences.plist`, `display_state.plist`, and assets into a structured JSON object.

✅ **Embedded Assets Support**  
- Serve images and attachments directly from the `.itmz` archive via API.

✅ **CLI Tools & Utilities**  
- Run extraction directly from terminal using `parse-map.js`.

✅ **Robust Testing**  
- Unit tests (Jest) for all extractors and the full pipeline.

---

## 📦 Tech Stack

- **Node.js** + **Express** (API backend)
- [`adm-zip`](https://www.npmjs.com/package/adm-zip) (ZIP archive handling)
- [`fast-xml-parser`](https://www.npmjs.com/package/fast-xml-parser) (XML → JSON)
- [`jest`](https://jestjs.io/) (unit testing)
- [`multer`](https://www.npmjs.com/package/multer) (file uploads)
- CORS enabled

---

## 🔧 Installation

1. **Clone the repo**
```
   git clone https://github.com/harmonoman/mindmap-backend.git
   cd mindmap-backend
```
2. **Install dependencies:**

```
npm install
```
3. **Run tests (optional but recommended)**

```
npm test
```
4. **Start the server:**
```
node server.js
```
**Server runs at:**
```
http://localhost:4000

```

## 🚥 API Endpoints

| Method | Endpoint                   | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/`                         | Health check — confirms running   |
| GET    | `/hello`                    | Returns `Hello World!`            |
| POST   | `/upload`                   | Upload a `.itmz` file, returns parsed JSON |
| GET    | `/image/:id`                | Fetches image from `.itmz` based on image ID UUID |

📤 **Upload a `.itmz` file**
POST `/upload`

- Form-data key: `file`
- Upload a `.itmz` file
- Response: Full map as JSON

🖼️ **Fetch an image from the `.itmz`**
GET `/image/:id`

- Example URL:
```
http://localhost:4000/image/B4E1B655-CC63-4A3E-B925-277CFA962690

```
- Response: PNG image

---

## 🛠️ CLI Tools
Parse a .itmz file to JSON
```
node cli/parse-map.js ./sample-data/example-map.itmz
```
Outputs full map JSON to extracted-data/full_map.json

---

## 📁 Folder Structure
```
mindmap-backend/
├── cli/                 # CLI tools (e.g., parse-map.js)
├── extract-scripts/     # Legacy standalone scripts for manual extraction
├── extracted-data/      # Output JSON (gitignored)
├── lib/                 # Core reusable extraction modules
├── sample-data/         # Example .itmz files for testing
├── scripts/             # Helper scripts (e.g., create fixtures)
├── tests/               # Jest unit tests + fixtures
├── tools/               # Utility tools (e.g., list-itmz.js)
├── server.js            # Express server
└── package.json
```

---

## 🧪 Running Tests
This project uses Jest for unit tests:
```
npm test
```
Tests cover:
- Each extractor (mapdata, style, etc.)
- The full pipeline (extractAll)
- Corrupt/malformed .itmz handling
- Large file stress tests

---

## 🚧 TODO / Roadmap
 ✅ Build extraction pipeline
 ✅ Add CLI + API support
 ✅ Unit test extractors
 [] Build React frontend for rendering
 [] Support editing and saving maps
 [] Deploy API backend

---

## 🤝 Contributing
If you'd like to collaborate, fork the repo, make changes, and submit a PR!
Ideas, feedback, or issues are welcome.

## 📜 License
MIT License — free to use, modify, and distribute.

## 💡 Acknowledgments
- iThoughts — inspiration for this project

- Node.js community packages like `adm-zip` and `fast-xml-parser`