const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

// Configurer les variables d'environnement pour l'authentification
process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Initialiser Vertex AI
const vertexAI = new VertexAI({ project: process.env.GCP_PROJECT_ID, location: 'us-central1' });
const generativeLanguageModel = vertexAI.getGenerativeModel({ model: 'gemini-1.0-pro-vision-001' });

// Fonction pour vérifier si un terme semble être un ingrédient alimentaire
const isIngredient = (term) => {
  // Vérification simple : un mot est considéré comme un ingrédient s'il a moins de 20 caractères et ne contient pas de chiffres
  return term.length > 0 && term.length <= 20 && !/\d/.test(term);
};

const isRecipeRequest = (ingredients) => {
  return Array.isArray(ingredients) && ingredients.every(isIngredient);
};

exports.getRecipes = async (req, res) => {
  const ingredients = req.body.ingredients;

  // Vérifier si la requête parle de recettes
  if (!isRecipeRequest(ingredients)) {
    return res.status(400).json({ message: "Please provide valid cooking ingredients." });
  }

  const request = {
    contents: [{
      role: 'user',
      parts: [{ text: `Please suggest ONLY recipes using these ingredients: ${ingredients.join(', ')}. If they are not ingredients for cooking, show me a message error: "please write an ingredient"` }]
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
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
