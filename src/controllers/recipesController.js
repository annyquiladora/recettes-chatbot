const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

// Configurer Vertex AI
const vertexAI = new VertexAI({ project: process.env.GCP_PROJECT_ID, location: 'us-central1' });
const generativeLanguageModel = vertexAI.getGenerativeModel({ model: 'gemini-1.0-pro-vision-001' });
// Configurer les variables d'environnement pour l'authentification
process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

exports.getRecipes = async (req, res) => {
  const ingredients = req.body.ingredients;

  const request = {
    contents: [{
      role: 'user',
      parts: [{ text: `Please suggest recipes using these ingredients: ${ingredients.join(', ')}` }]
    }],
  };

  try {
    const responseStream = await generativeLanguageModel.generateContentStream(request);

    let recipes = '';
    for await (const item of responseStream.stream) {
      recipes += item.candidates[0].content.parts[0].text;
    }

    res.json({ recipes });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send('Internal Server Error');
  }
};
