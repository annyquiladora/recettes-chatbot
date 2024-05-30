const express = require('express');
const bodyParser = require('body-parser');
const {VertexAI} = require('@google-cloud/vertexai');

// Chemin vers votre fichier de clés JSON
const pathToServiceAccountKey = 'C:\\Users\\anny.barrero-duarte\\gorditos-recipe\\principal-lane-423410-p3-47760941546b.json';

// Configurer les variables d'environnement pour l'authentification
process.env.GOOGLE_APPLICATION_CREDENTIALS = pathToServiceAccountKey;

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialiser Vertex AI
const vertexAI = new VertexAI({project: 'principal-lane-423410-p3', location: 'us-central1'});

const generativeLanguageModel = vertexAI.getGenerativeModel({model: 'gemini-1.0-pro-vision-001'});

// Endpoint pour poser des questions
app.post('/get-recipes', async (req, res) => {
  const ingredients = req.body.ingredients;

  const request = {
    contents: [{
      role: 'user', 
      parts: [{text: `Please suggest recipes using these ingredients: ${ingredients.join(', ')}`}]
    }],
  };

  try {
    const responseStream = await generativeLanguageModel.generateContentStream(request);

    let recipes = '';
    for await (const item of responseStream.stream) {
      recipes += item.candidates[0].content.parts[0].text;
    }

    res.json({recipes});
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
