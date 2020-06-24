import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getUsersApi } from '../apis/usersAPI.js'

function getUsersRouter() {

    const router = express.Router()

    const usersAPI = getUsersApi()

    //Trae todos los usuarios, solo accedido por admin
    router.get('/index', verifyToken, async (req, res) => {

        try{
            const users = await usersAPI.findAll()
            
            res.json(users)
            }
            catch {
                return res.status(404).send('No users found')
            }
    })

    //Crea un usuario
    router.post('/create', verifyToken, async (req, res) => {

        const userToAdd = req.body

        try {
            const userAdded = await usersAPI.add(userToAdd)
            res.status(201).json(userAdded)
        } catch (err) {
            res.status(err.status).json(err)
        }
    })

    //Para ver un usuario
    router.get('/show/:id', verifyToken, async (req, res) => {

        try {
            const user = await usersAPI.findById(req.params.id)
            res.status(200).json(user)
        } catch (err) {
            res.status(404).send('No user found')
        }

    })

    //Para reemplazar un usuario completo
    router.put('/update', verifyToken, async (req, res) => {

        console.log("estos datos llegan en el id", req.userId)
        console.log("estos datos llegan en el body", req.body)

        const userToReplace = req.body
        const userId = req.userId
        
        
        try {
            let userReplaced = await usersAPI.replaceUser(userId, userToReplace)
           
            res.status(200).json(userReplaced)
        } catch (err) {
            res.status(404).send('Cannot update')
        }
    })

    //Para actualizar campos de un usuario
    router.patch('/update/:id', verifyToken, async (req, res) => {

        const userToReplace = req.body
        const userId = req.userId
        try {
            let userReplaced = await usersAPI.replaceUser(userId, userToReplace)
           
            res.status(200).json(userReplaced)
        } catch (err) {
            res.status(404).send('Cannot update')
        }
    })

    //Borrar un usuario
    router.delete('/delete/:id', verifyToken, async (req, res) => {

        try {
            await usersAPI.deleteOne(req.params.id)
            res.status(204).send('User deleted')
        } catch (err) {
            res.status(404).send('Cannot delete')
        }

    })

    //Borrar todos los usuarios
    router.delete('/delete', verifyToken, async (req, res) => {

        try {
            await usersAPI.deleteAll()
            res.status(204).send('All users deleted')
        } catch (err) {
            res.status(404).send('Cannot delete')
        }

    })


    return router
}
export default getUsersRouter