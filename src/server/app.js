import express from 'express';
import authController from './routers/authController.js'

function createApp() {
//Genera un nueva instancia de servidor
const app = express();


//Con esta instruccion le permite al servidor entender los archivos JSON
//Cuando se le envie un JSON al servidor lo convertira a un objeto Javascript
//Le permite ver el req.body
app.use(express.json());

//Con esta instruccion entiende los objetos que le llegan por formulario y lo convierte en un objeto javascript
app.use(express.urlencoded({extended: false}));

app.use(authController)

return app
}

export default createApp