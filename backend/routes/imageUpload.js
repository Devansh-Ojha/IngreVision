const express = require('express');
const multer = require('multer');
const { processImage } = require('../config/geminiAPI');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route to upload the image and return the recipe
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        console.log('Image uploaded:', file.originalname); // Log image upload

        // Call the Gemini API to process the image
        const recipe = await processImage(file);

        console.log('Recipe generated:', recipe); // Log the generated recipe

        res.json({ recipe }); // Send the recipe as JSON response

        console.log("-----------------------------------------------------");

    } catch (error) {
        console.error('Error generating recipe:', error); // Log any errors
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

module.exports = router;