const express = require('express');
const { readFile } = require('fs').promises;
const { request } = require('http');

const app = express();

app.get('/', async (request, response) => {
    response.send( await readFile('./home.html', 'utf8') )
});

app.get('/test', async (request, response) => {
    response.send( await readFile('./test.html', 'utf8') )
});

app.listen(process.env.PORT || 3000);