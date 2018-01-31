const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const PORT = (process.env.PORT || 3000);
const FILE_NAME = 'results.json';
const FILE_PATH = path.join(__dirname, `${FILE_NAME}`);

import hcRoute from './routes/hc';
import resultRout from './routes/result';

// ====

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ====

app.get('/hc', (req, res) => hcRoute(res, FILE_NAME));
app.get('/result', (req, res) => resultRout(res, FILE_PATH));

// ====

app.listen(PORT, () => {
    console.warn(`Server is running on http://localhost:${PORT}`);
});