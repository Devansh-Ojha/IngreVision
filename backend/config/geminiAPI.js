require('dotenv').config();
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const processImage = async (file) => {
    try {
        const fileBuffer = fs.readFileSync(file.path);
        const base64Image = fileBuffer.toString('base64');

        console.log('Sending image to Google Gemini API'); // Log before sending

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            'Generate a recipe based on this image and for instructions section it should be considered as single dish not sub dishes in it: and give name, ingredients, instructions and tips thats it each time',
            {
                inlineData: {
                    mimeType: 'image/png',
                    data: base64Image,
                },
            },
        ]);

        // console.log('Received response from Gemini API:', result.response.text()); // Log the response

        return result.response.text();
    } catch (error) {
        console.error('Error processing image with Gemini API:', error);
        throw error;
    }
};

module.exports = { processImage };