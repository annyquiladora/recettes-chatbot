const express = require('express');
const bodyParser = require('body-parser');
const recipesRouter = require('./routers/recipesRouter');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', recipesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});