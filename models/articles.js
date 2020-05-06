'use strict'

const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
})

module.exports = mongoose.model('Article', ArticleSchema);
//articles --> guarda documentos de este tipo y con esta estructura dentro de la coleccion













