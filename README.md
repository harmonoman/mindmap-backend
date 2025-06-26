# mindmap-backend

A Node.js backend to parse and serve data from **iThoughts (.itmz) mind map files**.  
It extracts the map structure (XML to JSON) and serves embedded images directly from the `.itmz` archive.

---

## 🚀 Features

- 📄 Upload `.itmz` mind map files
- 🔍 Parse and convert `mapdata.xml` to JSON
- 🖼️ Serve embedded images (e.g., node attachments) via URL
- ⚙️ Simple API endpoints for testing and development

---

## 📦 Tech Stack

- Node.js + Express
- `adm-zip` for ZIP file handling
- `fast-xml-parser` for XML to JSON conversion
- `multer` for handling file uploads
- CORS enabled

---

## 🔧 Installation

1. **Clone the repo:**

```
git clone https://github.com/your-username/mindmap-backend.git
cd mindmap-backend
```
2. **Install dependencies:**

```
npm install
```
3. **Start the server:**

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
| GET    | `/test`                     | Simple test for GET                |
| POST   | `/test`                     | Simple test for POST               |
| POST   | `/upload`                   | Upload a `.itmz` file, returns parsed JSON |
| GET    | `/image/:id`                | Fetches image from `.itmz` based on image ID UUID |

📤 **Upload a `.itmz` file**
POST `/upload`

- Form-data key: `file`
- Upload a `.itmz` file
- Response: Parsed `mapdata.xml` as JSON

🖼️ **Fetch an image from the `.itmz`**
GET `/image/:id`

- Example URL:
```
http://localhost:4000/image/B4E1B655-CC63-4A3E-B925-277CFA962690

```
- Fetches image from:
```
assets/{id}/image.png
```
inside the `.itmz` file.

- Response: PNG image

## 🛠️ Local Extraction Utility

This repo includes a helper script to extract the `mapdata.xml` file directly from an `.itmz` file.

### 🔧 Run it like this:

```
node extract-mapdata.js
```

📜 What it does:
- Opens MyMap.itmz (make sure the file is in the project folder).

- Extracts mapdata.xml.

- Saves it as mapdata_extracted.xml in the current directory.

⚠️ Note:
Make sure your .itmz file is named MyMap.itmz and is located in the root of the project directory (or adjust the filename in the script).

## 📁 Folder Structure
```
mindmap-backend/
├── uploads/             # Temporary file uploads (handled by multer)
├── node_modules/        # Dependencies
├── server.js            # 🖥️ Main server file (API backend)
├── package.json         # Project metadata & dependencies
├── README.md            # Project documentation
├── MyMap.itmz           # Example .itmz file (optional, for testing)
├── list-itmz.js         # 🔍 Utility — lists files inside a .itmz
├── extract-mapdata.js   # 📤 Utility — extracts mapdata.xml to local file
````

## 🚧 TODO / Roadmap
- Parse and visualize relationships between topics

-  Build a React-based frontend (`mindmap-frontend`)

- Add authentication (optional)

- Support saving edits back to `.itmz` or JSON

- Deploy (Render, Railway, Fly.io, etc.)

## 🤝 Contributing
If you'd like to collaborate, fork the repo, make changes, and submit a PR!
Ideas, feedback, or issues are welcome.

## 📜 License
MIT License — free to use, modify, and distribute.

## 💡 Acknowledgments
- iThoughts — inspiration for this project

- Node.js community packages like `adm-zip` and `fast-xml-parser`