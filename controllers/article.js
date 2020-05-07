"use strict";

const validator = require("validator");
const fs = require("fs");
const path = require("path");

const Article = require("../models/article");

const controller = {
  datosCurso: (req, res) => {
    var hola = req.body.hola;

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
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      //Crear objeto a guardar, utilizando el modelo e instanciamos
      var article = new Article();

      //Asignamos los valores
      article.title = params.title;
      article.content = params.content;
      article.image = params.image;

      //Guardar el articulo
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "error",
            message: "El articulo no se ha guardado !!!",
          });
        }
        //Devolvemos respuesta
        return res.status(200).send({
          status: "success",
          article: articleStored,
        });
      });
    } else {
      return res.status(200).send({
        status: "error",
        message: "Campos vacios",
      });
    }
  },

  getArticles: (req, res) => {
    //Last articles
    var query = Article.find({});
    var last = req.params.last;

    if (last || last != undefined) {
      query.limit(5);
    }

    //Find en la base de datos; sort ordena por id con el - ordena descendente (+ nuevo al mas viejo)
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos",
        });
      }

      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "Error no existen articulos",
        });
      }

      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },
  getArticle: (req, res) => {
    //Recoger id de la url
    var articleId = req.params.id;
    //console.log(articleId);

    //Comprobar que existe
    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "Error no existe el articulo",
      });
    }

    //Buscar un articulo y comprobamos
    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(500).send({
          status: "error",
          message: "Error no existe el articulo",
        });
      }

      //Devolverlo en JSON
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },

  update: (req, res) => {
    //Recoger id por articulo de la url
    var articleId = req.params.id;

    //Recoger los datos que llegan por put
    var params = req.body;

    //Validar los datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
    if (validate_title && validate_content) {
      //Find and update
      Article.findOneAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err && !articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No encontrado, no actualizado",
            });
          }
          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    } else {
      //Devolver respuesta
      return res.status(404).send({
        status: "error",
        message: "Validacion incorrecta",
      });
    }
  },

  delete: (req, res) => {
    //Recoger id de la url
    var articleId = req.params.id;

    //Find and delete
    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar",
        });
      }
      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado el articulo",
        });
      }
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },

  //Subida de archivos
  upload: (req, res) => {
    //Configurar module connect multiparty router/article.js

    //Recoger el fichero de la peticion
    var file_name = "Imagen no subida...";
    //console.log(req.files)

    if (!req.files) {
      console.log(req.files);
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    //Obtener nombre y extension del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");
    //ADVERTENCIA * EN LINUX O MAC
    //var file_split = file_path.split('/');
    //Nombre del archivo
    var file_name = file_split[2];

    //Extension del fichero
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];

    //Comprobar la extension, solo imagenes, si es valida borrar el fichero
    if (
      file_ext != "png" &&
      file_ext != "jpeg" &&
      file_ext != "jpg" &&
      file_ext != "gi f"
    ) {
      //borrar el archivo subido
      fs.unlink(file_path, (err) => {
        return res.status(404).send({
          status: "error",
          message: "La extension de la imagen no es válida !!!",
        });
      });
    } else {
      //si todo es valido, sacando id de la url
      var articleId = req.params.id;

      //Buscar el articulo, aignarle el nombre de la imagen y actualizarlo
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: file_name },
        { new: true },
        (err, articleUpdated) => {
          if (err || !articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "Error al guardar el articulo",
            });
          }
          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    }
  }, //end upload files
}; //end controller

module.exports = controller;
