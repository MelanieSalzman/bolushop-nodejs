import jwt from 'jsonwebtoken'
import config from '../../config.js'

let adminpaths = [
    '/index',
    '/create',
    '/show',
    '/delete'
]

function verifyToken (req, res, next) {
    
    console.log("paso por aca")
    //Busca en la cabecera un x-access-token y lo guarda en token 
    const token = deleteBearerFromToken(req.headers['authorization'])
    //Si no habia un token en la cabecera, no le permitira entrar
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        })
    }
    const decoded = jwt.verify(token, config.secret)

    if(decoded){

        //Si recibe un id como parametro, lo elimina del path para compararlo con los path declarados para admin
        //Sino devuelve el path como vino
        if(req.params.id!=null){
        var reqPath = deleteIdFromPath(req.path)
        }
        else{
            reqPath = req.path
        }
        //Si el path de la peticion es igual a los path autorizados para admin
        if(adminpaths.indexOf(reqPath)!=-1){
            
            if(decoded.rol!='admin'){
                return res.status(403).json({
                    auth: false,
                    message: 'Dont have permission'
                })
            }
        }
    }
    req.userId = decoded.id
    next()
}

    function deleteIdFromPath (path) {

    //Separa el path de entrada
    let arrPath = path.split('/')

    //borra el ultimo elemento, osea el id
    arrPath = arrPath.splice((arrPath.length-2),1)

    //Le agrega una barra al path de salida
    let pathOut = '/' + arrPath

    return pathOut
}

function deleteBearerFromToken (header) {

    let token = ''; 
    if(header){
    //Separa el path de entrada
    let arrToken = header.split(' ')
    arrToken = arrToken.splice(1,1)
    token = arrToken.toString()
    }

    return token
}

export default verifyToken