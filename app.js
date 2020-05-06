'use strict'

// Cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a las rutas

// Ruta o metodo de prueba
app.post('/datos-curso', function(req, res) {
    let hola = req.body.hola;
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Samuel Ruiz',
        url: 'tamueka.com',
        hola,
    });
});

// Exportar el modulo (fichero actual)
module.exports = app;



