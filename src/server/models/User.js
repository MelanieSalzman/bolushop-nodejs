import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String
});



//Encripta la contraseña. Le aplica un algoritmo y me devuelve un string cifrado
userSchema.methods.encryptPassword = async (password) => {

    //Cuantas veces le quiero aplicar el algoritmo
   const salt = await bcrypt.genSalt(saltRounds)

   //Convierte la contraseña en el string cifrado
   return bcrypt.hash(password, salt)

}

userSchema.methods.validatePassword = function (password) {

    return bcrypt.compare(password, this.password)
}
const User = mongoose.model('User', userSchema);

export default User

