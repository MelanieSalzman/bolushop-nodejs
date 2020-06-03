import config from '../../config.js'
import jwt from 'jsonwebtoken'
import { getUsersDAO } from '../dao/daoFactory.js'

function getAuthAPI() {

    const usersDAO = getUsersDAO()

    async function login(UserToBeLogged) {
        const UserLogged = await usersDAO.login(UserToBeLogged)

        return UserLogged
    }

    async function register(UserToBeRegistered) {
        let UserRegistered = await usersDAO.register(UserToBeRegistered)
        
        UserRegistered = await usersDAO.encryptPassword(UserRegistered)
        
        //user.save() para guardar en la bd
        await usersDAO.saveUser(UserRegistered)
        
        return UserRegistered
    }

    async function findById(UserId) {
        const user = await usersDAO.findById(UserId)
        return user
    }

    async function validatePass(UserLogged,UserToBeLogged) {
        const validPassword = await usersDAO.validatePassword(UserLogged,UserToBeLogged.password)
        return validPassword
    }

    async function genToken(userId) {
        const token = jwt.sign({id: userId}, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        
        return token
    }

    return {
        login,
        register,
        findById,
        validatePass,
        genToken
    }
}

export {
    getAuthAPI
}