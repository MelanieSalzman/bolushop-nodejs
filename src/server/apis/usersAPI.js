import { getUsersDAO } from '../dao/daoFactory.js'
//import { validUser } from '../validaciones/users.js'
//import { createError } from '../errores/errores.js'

function getUsersApi() {

    const usersDAO = getUsersDAO()

    async function find(email) {
        const user = await usersDAO.findByEmail(email)
        return user
    }

    async function findAll() {
        const users = await usersDAO.findAll()
        return users
    }

    async function findById(UserId) {
        const user = await usersDAO.findById(UserId)
        return user
    }

    

    async function add(userToAdd) {
        //isUserValid(userToAdd)
        let UserCreated = await usersDAO.create(userToAdd)
        UserCreated = await usersDAO.encryptPassword(UserCreated)
        await usersDAO.save(UserCreated)
        return UserCreated
    }
    
    async function updateUser(id, user) {
       // isUserValid(userToReplace)
       // areIdsEqual(userToReplace.id, id)
       let updated = false
       let userfounded = await usersDAO.findById(id)

       if(userfounded){
       let UserCreated = await usersDAO.create(user)
       let userToReplace = await usersDAO.encryptPassword(UserCreated)
       await usersDAO.replaceUser(id, userToReplace)

       updated=true
        
       }
       return updated
    }

    async function deleteOne(id) {
        await usersDAO.deleteOne(id)
    }

    async function deleteAll() {
        await usersDAO.deleteAll()
    }

    

    /*
    function areIdsEqual(id1, id2) {
        if (id1 != id2) {
            throw createError(400, 'no coinciden los ids enviados')
        }
    }

    function isUserValid(user) {
        try {
           validUser(user)
        } catch (error) {
            throw createError(400, 'el estudiante posee un formato json invalido o faltan datos')
        }
    }*/

    return {
        add,
        find,
        findAll,
        findById,
        updateUser,
        deleteOne,
        deleteAll
    }
}

export {
    getUsersApi
}