const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes); // Todas as rotas estarão acessíveis a partir de /api

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
