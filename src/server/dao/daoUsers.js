import User from '../models/User.js'


function getUsersDAOLocal() {

    async function login(UserToBeLogged) {
        const UserLogged = User.findOne({email: UserToBeLogged.email})
        return UserLogged
    }

    async function register(UserToBeRegistered) {

        const UserRegistered = new User({
            email: UserToBeRegistered.email,
            password: UserToBeRegistered.password
        })
        return UserRegistered
    }

    async function findById(UserId) {

        const user = User.findById(UserId, { password: 0 });
        return user
    }

    async function saveUser(user) {
       user.save()
    }

    async function validatePassword(UserLogged,password) {
        const validPassword = await UserLogged.validatePassword(password)
        return validPassword
     }

     async function encryptPassword(user) {
        user.password = await user.encryptPassword(user.password)
        return user
     }


    return {
        login,
        register,
        findById,
        saveUser,
        validatePassword,
        encryptPassword
    }
}

export {
    getUsersDAOLocal
}















