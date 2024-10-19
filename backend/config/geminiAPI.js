require('dotenv').config();
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const processImage = async (file) => {
    try {
        // Convert image file to base64
        const fileBuffer = fs.readFileSync(file.path);
        const base64Image = fileBuffer.toString('base64');

        console.log('Sending image to Google Gemini API'); // Log before sending

        // Call the Gemini API to generate a recipe
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            'Generate a recipe based on this image:',
            {
                inlineData: {
                    mimeType: 'image/png',
                    data: base64Image,
                },
            },
        ]);

        console.log('Received response from Gemini API:', result.response.text()); // Log the response

        return result.response.text(); // Return the recipe text
    } catch (error) {
        console.error('Error processing image with Gemini API:', error);
        throw error;
    }
};

module.exports = { processImage };