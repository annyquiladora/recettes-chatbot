const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.post('/get-recipes', recipesController.getRecipes);

module.exports = router;
