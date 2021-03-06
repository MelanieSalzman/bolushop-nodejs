import express from 'express';
import cors from 'cors';
import {getUsersRouter} from './routers/userRouter.js'
import getAuthRouter from './routers/authRouter.js'
import getProductosRouter from './routers/productosRouter.js'
import getMailRouter from './routers/mailRouter.js';
import getWppRouter from './routers/wppRouter.js'

function createApp() {
//Genera un nueva instancia de servidor
const app = express();

app.use(cors());
//Con esta instruccion le permite al servidor entender los archivos JSON
//Cuando se le envie un JSON al servidor lo convertira a un objeto Javascript
//Le permite ver el req.body
app.use(express.json());

//Con esta instruccion entiende los objetos que le llegan por formulario y lo convierte en un objeto javascript
app.use(express.urlencoded({extended: false}));

//app.use(authController)
app.use('/api/users', getUsersRouter())
app.use('/api/auth', getAuthRouter())
app.use('/api/productos', getProductosRouter())
app.use('/api/email',getMailRouter())
app.use('/api/whatssapp', getWppRouter())
return app
}

export default createApp
