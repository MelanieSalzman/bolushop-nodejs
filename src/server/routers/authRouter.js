import Router from 'express'
import verifyToken from './verifyTokenRouter.js'
import { getAuthAPI } from '../apis/authAPI.js'


function getAuthRouter() {

    const router = Router()

    const authAPI = getAuthAPI()

    //Ruta post para iniciar sesion
    router.post('/login', async (req, res) => {

        const userToBeLogged = req.body

        try {
            const userLogged = await authAPI.login(userToBeLogged)
            const validPassword = await authAPI.validatePass(userLogged,userToBeLogged)

            if (!validPassword) {
                return res.status(401).json({ auth: false, token: null })
            }
            const token = await authAPI.genToken(userLogged)

            //Trata lo que envia como un objeto
            res.json({ auth: true, token })

        } catch (err) {
            res.status(404).send('The email doesn´t exists')
        }
    })

    //Ruta post para registrarse
    router.post('/register', async (req, res) => {

        const userToBeRegistered = req.body

        try {

            const userRegistered = await authAPI.register(userToBeRegistered)
            
        console.log(userRegistered)
            const token = await authAPI.genToken(userRegistered._id)


            //Trata lo que envia como un objeto
            res.json({ auth: true, token: token })
        } catch (err) {
            //res.status(err.status).json(err)
            res.status(404).send('Cannot register user')
        }

    })


    //Ruta post para perfil
    //con verifytoken protejo la ruta de que alguien ingrese sin token
    router.get('/profile', verifyToken, async (req, res) => {

        try{
        const user = await authAPI.findById(req.userId)
        res.json(user)
        }
        catch {
            return res.status(404).send('No user found')
        }

        //Trata lo que envia como un objeto
        
    })

    return router
}

export default getAuthRouter