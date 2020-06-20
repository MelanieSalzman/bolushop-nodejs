import config from '../../config.js'
import jwt from 'jsonwebtoken'
import { getUsersDAO } from '../dao/daoFactory.js'

function getAuthAPI() {

    const usersDAO = getUsersDAO()

    async function find(UserToBeLogged) {
        const UserLogged = await usersDAO.findByEmailWithPass(UserToBeLogged.email)

        return UserLogged
    }

    async function register(UserToBeRegistered) {

        let UserCreated = await usersDAO.create(UserToBeRegistered)
        UserCreated = await usersDAO.encryptPassword(UserCreated)
        //user.save() para guardar en la bd
        await usersDAO.save(UserCreated)
        
        return UserCreated
    }

    async function findById(UserId) {
        const user = await usersDAO.findById(UserId)
        return user
    }

    async function validatePass(user,UserToBeLogged) {
        const validPassword = await usersDAO.validatePassword(user,UserToBeLogged.password)
        return validPassword
    }

    async function genToken(user) {

        //payload es lo que contendra el token
        let payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            rol: user.rol
        }
        const token = jwt.sign(payload, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        
        return token
    }

    return {
        find,
        findById,
        validatePass,
        genToken,
        register
    }
}

export {
    getAuthAPI
}