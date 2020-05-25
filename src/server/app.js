import express from 'express';
import authController from './routers/authController.js'

const app = express();


//Con esta instruccion le permite al servidor entender los archivos JSON
//Cuando se le envie un JSON al servidor lo convertira a un objeto Javascript
app.use(express.json());

//Con esta instruccion entiende los objetos que le llegan por formulario y lo convierte en un objeto javascript
app.use(express.urlencoded({extended: false}));

app.use(authController)

export default app