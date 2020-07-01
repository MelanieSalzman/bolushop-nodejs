import User from '../models/User.js'


function getUsersDAOLocal() {

    async function create(UserToBeCreated) {

        const UserCreated = new User({
            name: UserToBeCreated.name,
            username: UserToBeCreated.username,
            email: UserToBeCreated.email,
            password: UserToBeCreated.password,
            rol: UserToBeCreated.rol
        })

        return UserCreated
    }

    async function createWithoutPass(UserToBeCreated) {

        const UserCreated = new User({
            name: UserToBeCreated.name,
            username: UserToBeCreated.username,
            email: UserToBeCreated.email
        })

        return UserCreated
    }
    
    async function changePass(userToBeUpdated,newPassword) {

        const UserCreated = new User({
            name: userToBeUpdated.name,
            username: userToBeUpdated.username,
            email: userToBeUpdated.email,
            password: newPassword,
            rol: userToBeUpdated.rol
        })

        return UserCreated
    }

    async function findByEmail(email) {

        const user = User.findOne({email: email}, { password: 0 });
        return user
    }

    async function findByUserName(username) {

        const user = User.findOne({username: username}, { password: 0 });
        return user
    }

    async function findByEmailWithPass(email) {

        const user = User.findOne({email: email});
        return user
    }

    async function findAll() {

        const user = User.find({});
        return user
    }

    async function save(user) {
       user.save()
    }

    async function validatePassword(user,password) {
        const validPassword = await user.validatePassword(password)
        return validPassword
     }

     async function encryptPassword(user) {
        
        user.password = await user.encryptPassword(user.password)
        return user
     }

     async function findById(UserId) {

        const user = User.findById(UserId, { password: 0 });
        return user
    }

    async function findByIdWithPass(UserId) {

        const user = User.findById(UserId);
        return user
    }

    async function replaceUser(id, user){
        let userReplaced = User.findOneAndUpdate({_id: id}, {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            rol: user.rol
        },{new: true});
        return userReplaced
    }

    async function replaceUserWithoutPass(id, user){
        let userReplaced = User.findOneAndUpdate({_id: id}, {
            name: user.name,
            username: user.username,
            email: user.email
        },{new: true});
        return userReplaced
    }

    async function updateCodeFromUser(id,code){
        const userUpdated = User.findOneAndUpdate({_id:id},{
            resetPasswordCode: code
        });
        return userUpdated
    }

    async function deleteOne(id){
        const user = User.findOneAndDelete({_id: id});
        return user
    }

    async function deleteAll(){
        const user = User.deleteMany({})
        return user
    }

    return {
        create,
        findByEmail,
        findByUserName,
        findByEmailWithPass,
        findById,
        findAll,
        encryptPassword,
        validatePassword,
        save,
        replaceUser,
        deleteOne,
        deleteAll,
        changePass,
        updateCodeFromUser,
        findByIdWithPass,
        replaceUserWithoutPass,
        createWithoutPass
    }
}

export {
    getUsersDAOLocal
}















