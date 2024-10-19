const express = require('express');
const cors = require('cors');
const multer = require('multer');
const imageUploadRoute = require('./routes/imageUpload');
require('dotenv').config();

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Route for image upload
app.use('/api', imageUploadRoute);

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});