# Frontend Environment Setup

## Development

To connect the frontend to the backend API, set the API URL in `.env`:

```
REACT_APP_API_URL=http://localhost:5000
```

By default, it's set to `http://localhost:5000`.

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend (required):**
   ```bash
   cd ../backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python -m uvicorn app.main:app --host 127.0.0.1 --port 5000
   ```

3. **Start the React development server:**
   ```bash
   cd ../frontend
   npm start
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

## API Integration

The frontend communicates with three main endpoints:

1. **Text Prediction** - `/predict/text`
   - Takes raw news text as input
   - Returns: prediction (REAL/FAKE/UNSURE) with confidence score

2. **URL Prediction** - `/predict/url`
   - Extracts content from a given URL
   - Uses trafilatura + BeautifulSoup for web scraping
   - Returns: extracted text + prediction

3. **Image Prediction** - `/predict/image`
   - Extracts text from images using Tesseract OCR
   - Returns: extracted text + prediction

## Features

- ✅ Real-time health check (backend connectivity)
- ✅ Text analysis (direct input)
- ✅ URL analysis (web scraping + classification)
- ✅ Image analysis (OCR + classification)
- ✅ Confidence scoring & credibility assessment
- ✅ Future claim detection (2025-2027 marked as UNSURE)
- ✅ Responsive UI with error handling

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

## Notes

- The backend must be running for any predictions to work
- CORS is already enabled on the backend side
- Image OCR requires Tesseract-OCR binary installed on the system
