'use strict'

const express = require('express');
const ArticleController = require('../controllers/article');

const router = express.Router();

const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: './upload/articles' });

//Rutas de prueba
router.post("/datos-curso", ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas utiles
router.post('/save', ArticleController.save);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.put("/article/:id", ArticleController.update);
router.delete("/article/:id", ArticleController.delete);
router.post("/upload-image/:id", md_upload, ArticleController.upload);
router.get("/get-image/:image", ArticleController.getImage);


module.exports = router;





