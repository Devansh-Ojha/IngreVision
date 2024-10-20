const express = require('express');
const multer = require('multer');
const { processImage } = require('../config/geminiAPI');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        console.log('Image uploaded:\n', file.originalname);

        const recipe = await processImage(file);

        console.log('Recipe generated:\n', recipe);

        res.json({ recipe });

        console.log("-----------------------------------------------------");

    } catch (error) {
        console.error('Error generating recipe:', error);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

module.exports = router;