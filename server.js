import express from 'express'
import {engine} from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import 'dotenv/config'
import passport from 'passport'
import methodOverride from 'method-override'
import cors from 'cors'
import path from 'path'

import routerUsuarios from './routers/usuarios.router.js'
import handleConnection from './utils/handle-connection.js'
import * as passportStrategy from './utils/handle-passport.js'

// ! Constantes/Variables
const app = express();
const PORT = process.env.PORT || 2222
const NODE_ENV = process.env.NODE_ENV
const MONGO_LOCAL = process.env.MONGO_LOCAL
const MONGO_REMOTO = process.env.MONGO_REMOTO
const SECRET_SESSION = process.env.SECRET


// ! Configuración de CORS
const corsOptions = {origin:['http://localhost:5173', 'http://127.0.0.1:5501'], credentials: true}

app.use(cors(corsOptions));



//! Configuración del motor de vistas (hbs)
app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}))

// * Handlebars a express
app.set('view engine', 'hbs')
app.set('views', './views')


// ! Middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



// ! Configuración Express Session
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_LOCAL }),
  })
);

// ! Configuración Passport
app.use(passport.initialize());
app.use(passport.session());

// ! Modelo de datos (formulario)
const contactSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  asunto: String,
  pais: String,
  comentarios: String,
  autorizacion: Boolean,
});

const contact = mongoose.model('contact', contactSchema);



// ! Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
  console.log(req.body);
  const contactData = new contact(req.body);
  contactData
    .save()
    .then(() => res.status(200).send('Formulario enviado exitosamente'))
    .catch((err) => res.status(500).send('Error al enviar el formulario'));
});


// ! Rutas ("/")
app.use('/', routerUsuarios); // ! Router para usuarios


app.get('/', (req, res) => {
  res.send('OK');
});

// ! Arranque del servidor
app.listen(PORT, (err) => {
  if (err) throw new Error(`No se pudo levantar el servidor -> ${err}`);
  console.log(`Aplicación arrancó -> http://localhost:${PORT}`);

  // console.log(NODE_ENV);
  if (NODE_ENV === 'desarrollo') {
    handleConnection(MONGO_LOCAL);
  } else {
    handleConnection(MONGO_REMOTO);
  }
});
