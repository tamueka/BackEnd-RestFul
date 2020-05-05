"use strict";

const mongoose = require("mongoose");
const app = require('./app');
const port = 3900;

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose
  .connect("mongodb://localhost:27017/api_rest_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion a la base de datos correcta !!");

    // Creamos servidor y escuchamos peticiones http
    app.listen(port, ()=> {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    })

  });
