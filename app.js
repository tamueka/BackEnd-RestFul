'use strict'

// Cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
const article_routes = require('./routes/article')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a las rutas / Cargar rutas
app.use('/api', article_routes);


// Exportar el modulo (fichero actual)
module.exports = app;



