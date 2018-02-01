const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const PORT = (process.env.PORT || 3000);
const FILE_NAME = 'results.json';
const FILE_PATH = path.join(__dirname, `${FILE_NAME}`);

import hcRoute from './routes/hc';
import resultRoute from './routes/result';
import techCrunchRoute from './routes/techcrunch';

// ====

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

// ====

app.get('/', (req, res) => res.sendFile('client/index.html', { root: __dirname }));

// Hacker News
app.get('/hc', (req, res) => hcRoute(res, FILE_NAME));
app.get('/hc/result', (req, res) => resultRoute(res, FILE_PATH));

// Last FM
app.get('/techcrunch', (req, res) => techCrunchRoute(res, FILE_NAME));
app.get('/techcrunch/result', (req, res) => resultRoute(res, FILE_PATH));

// ====

app.listen(PORT, () => {
    console.warn(`Server is running on http://localhost:${PORT}`);
});