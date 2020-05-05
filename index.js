"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose
  .connect("mongodb://localhost:27017/api_rest_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion a la base de datos correcta !!");
  });
