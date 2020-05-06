'use strict'

const express = require('express');
const ArticleController = require('../controllers/article');



const router = express.Router();

//Rutas de prueba
router.post("/datos-curso", ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas utiles
router.post('/save', ArticleController.save);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.put("/article/:id", ArticleController.update);
router.delete("/article/:id", ArticleController.delete);


module.exports = router;





