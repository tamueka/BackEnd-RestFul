"use strict";

const validator = require("validator");
const Article = require("../models/article");

const controller = {
  datosCurso: (req, res) => {
    let hola = req.body.hola;

    return res.status(200).send({
      curso: "Master en Frameworks JS",
      autor: "Samuel Ruiz",
      url: "tamueka.com",
      hola,
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la accion test de mi controlador de articulos",
    });
  },

  save: (req, res) => {
    //Recoger parametros por post
    var params = req.body;
    //console.log(params);

    //Validar datos (validator)
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch {
      return res.status(200).send({
        message: "Faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      //Crear objeto a guardar

      //Asignar valores

      //Guardar el articulo

      //Devolvemos respuesta
      return res.status(200).send({
        message: "Articulo guardado",
      });
    } else {
      return res.status(200).send({
        message: "Campos vacios",
      });
    }
  },
}; //end controller

module.exports = controller;
