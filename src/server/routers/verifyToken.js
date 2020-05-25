import jwt from 'jsonwebtoken'
import secret from '../../config.js'

function verifyToken (req, res, next) {

    //Busca en la cabecera un x-access-token y lo guarda en token 
    const token = req.headers['x-access-token']

    //Si no habia un token en la cabecera, no le permitira entrar
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        })
    }

    const decoded = jwt.verify(token, secret)
    req.userId = decoded.id
    next()
}

export default verifyToken