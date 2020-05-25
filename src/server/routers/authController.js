import Router from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import secret from '../../config.js'
import verifyToken from './verifyToken.js'

const router = Router()

//Ruta post para iniciar sesion
router.post('/login', async (req,res,next) => {

    const { email, password } = req.body
    const user = await User.findOne({email: email})

    if(!user) {
        return res.status(404).send('The email doesn´t exists')
    }

    const validPassword = await user.validatePassword(password)
    
    if(!validPassword){
        return res.status(401).json({auth: false, token: null})
    }

    const token = jwt.sign({id: user._id}, secret, {
        expiresIn: 60 * 60 * 24 
    })
    res.json({auth: true, token})
})

//Ruta post para registrarse
router.post('/register', async (req,res,next) => {
    
    const { email, password } = req.body
    
    const user = new User({
        email: email,
        password: password
    })

    //Encripta la contraseña con la funcion creada en user
    user.password = await user.encryptPassword(user.password)
    //user.save() para guardar en la bd
    await user.save()

    //el token expira en un tiempo dado en segundos, osea 60 seg * 60 = 1 hora * 24 = 1 dia
    //secret es una clave que yo defino
    const token = jwt.sign({id: user._id}, secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({auth: true, token: token})
})


//Ruta post para perfil
//con verifytoken protejo la ruta de que alguien ingrese sin token
router.get('/profile', verifyToken, async (req,res,next) => {

    //password en 0 .. no quiero que me devuelva la contraseña
    const user = await User.findById(req.userId, { password: 0 });
    if(!user){
        return res.status(404).send('No user found')
    }

    res.json(user)
})

export default router