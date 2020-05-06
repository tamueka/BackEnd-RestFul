"use strict";

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

}; //end controller

module.exports = controller;
