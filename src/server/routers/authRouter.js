import Router from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getAuthAPI } from '../apis/authAPI.js'


function getAuthRouter() {

    const router = Router()

    const authAPI = getAuthAPI()

    //Ruta post para iniciar sesion
    router.post('/login', async (req, res) => {

        const userToBeLogged = req.body

        try {
            const user = await authAPI.find(userToBeLogged)
            const validPassword = await authAPI.validatePass(user, userToBeLogged.password)

            if (!validPassword) {
                return res.status(401).json({ auth: false, token: null })
            }
            const token = await authAPI.genToken(user)

            //Trata lo que envia como un objeto
            res.json({ auth: true, token })

        } catch (err) {
            res.status(404).send('User doesn´t exists')
        }
    })

    //Ruta post para registrarse
    router.post('/register', async (req, res) => {


        const userToBeRegistered = req.body
        
        try {

            const userExist = await authAPI.findByEmail(userToBeRegistered)
            console.log('userExist',userExist)

            if (userExist) {
                res.status(404).send('Email already exists')

            } else {

                const userNameExist = await authAPI.findByUserName(userToBeRegistered)
                console.log('userNameExist',userNameExist)
                if (userNameExist) {
                    res.status(404).send('Usarname already exists')
                    //console.log('userNameExist',userNameExist)

                } else {
                    const userRegistered = await authAPI.register(userToBeRegistered)
                    const token = await authAPI.genToken(userRegistered)

                    //Trata lo que envia como un objeto
                    res.json({ auth: true, token: token })
                }

            }

        } catch (err) {
            res.status(404).send('Cannot register user')
        }

    })


    //Ruta post para perfil
    //con verifytoken protejo la ruta de que alguien ingrese sin token
    router.get('/profile', verifyToken, async (req, res) => {

        try {
            const user = await authAPI.findById(req.userId)
            res.json(user)
        }
        catch {
            return res.status(404).send('No user found')
        }

        //Trata lo que envia como un objeto

    })

    router.put('/changepassword', verifyToken, async (req, res) => {

        let password = req.body.password
        let newPassword = req.body.newPassword
        let user = req.userId

        try {
            let dbuser = await authAPI.findByIdWithPass(user)
            
            let validPassword = await authAPI.validatePass(dbuser, password)
            if (!validPassword) {
                return res.status(401).json({ auth: false, token: null })
            } 
            else{
            
            let userUpdated = await authAPI.replacePassword(dbuser,newPassword)
            const token = await authAPI.genToken(userUpdated)
            //Trata lo que envia como un objeto
            res.json({ auth: true, token: token })
            }

        }
        catch {
            return res.status(404).send('No user found')
        }

        //Trata lo que envia como un objeto

    })

    return router
}

export default getAuthRouter