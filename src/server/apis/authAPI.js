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

    async function validatePass(user, password) {
        const validPassword = await usersDAO.validatePassword(user, password)
        return validPassword
    }

    async function findByEmail(user) {
        let exist = false
        const userFounded = await usersDAO.findByEmail(user.email)

        if (userFounded != null) {
            exist = true

        }

        return exist
    
    }

    async function findByUserName(user) {
        let exist = false
        const userFounded = await usersDAO.findByUserName(user.username)

        if (userFounded != null) {
            exist = true

        }

        return exist
    
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

    async function replacePassword(userToBeUpdated,newpassword) {

        let userUpdated = await usersDAO.changePassword(userToBeUpdated,newpassword)
        userUpdated = await usersDAO.encryptPassword(userUpdated)
        //user.save() para guardar en la bd
        await usersDAO.replaceUser(userUpdated._id,userUpdated)

        return userUpdated
    }

    return {
        find,
        findById,
        findByEmail,
        validatePass,
        genToken,
        register,
        findByUserName,
        replacePassword
    }
}

export {
    getAuthAPI
}