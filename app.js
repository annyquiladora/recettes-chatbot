const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Ingrédients pour les pancakes
const pancakeIngredients = [
    "farine",
    "beurre",
    "oeuf",
    "lait entier",
    "levure chimique",
    "sucre vanillé",
    "sel"
];

// Recette pour les pancakes
const pancakeRecipe = "Mélanger 200g de farine, 30g de beurre fondu, 2 œufs, 250ml de lait entier, 1 sachet de levure chimique, 1 sachet de sucre vanillé et une pincée de sel. Cuire dans une poêle chaude jusqu'à ce que des bulles se forment à la surface, puis retourner et cuire jusqu'à ce que les deux côtés soient dorés.";

// Route pour : POST /chat
app.post('/chat', (req, res) => {
  const message = req.body.message;

  // Logique de traitement du message
  const response = chatbotResponse(message);

  res.json({ message: response });
});

// Route pour le endpoint POST /recipe
app.post('/recipe', (req, res) => {
    // Renvoyer la recette de pancakes
    res.json({ message: pancakeRecipe });
});

// chatbot
function chatbotResponse(message) {
  // Exemple de logique de chatbot basique
  if (message.toLowerCase().includes('salut') && message.toLowerCase().includes('ça va')) {
    return "Très bien et toi ?";
  } else {
    return "Je n'ai pas compris !";
  }
}

// Fonction pour la logique de chatbot recipe
function chatbotResponse(message) {
    // Convertir le message en minuscules pour une correspondance sans casse
    const lowercaseMessage = message.toLowerCase();

    // Vérifier si tous les ingrédients nécessaires sont présents dans le message
    const missingIngredients = pancakeIngredients.filter(ingredient => !lowercaseMessage.includes(ingredient));

    // Si les ingredients sont presents, j'envoie la recette
    if (missingIngredients.length === 0) {
        return pancakeRecipe;
    } else {
        return "Désolé, vous n'avez pas tous les ingrédients nécessaires pour préparer des pancakes.";
    }
}

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
