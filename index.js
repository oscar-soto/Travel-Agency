// Importar express
import express  from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
// Importar para variables de entorno
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})

const app = express();

// Conectar base de datos
db.authenticate()
  .then( () => console.log('Base de datos conectadas') )
  .catch( error => console.log(error))

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
  const year = new Date();
  res.locals.actuallyYear =  year.getFullYear();
  res.locals.nombresitio = 'Agencia de Viajes'
  
  return next(); // return: obligar a que pase el siguiente
});

// Agregar Body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

// Puerto y Host

// puerto
const port = process.env.PORT || 4000;
// host
const host = process.env.HOST || '0.0.0.0';

app.listen( port, host, () => {
  console.log(`El servidor esta funcionando`)
})