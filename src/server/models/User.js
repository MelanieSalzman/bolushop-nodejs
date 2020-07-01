import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
       // required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
       required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: false
    },
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
    },
    rol: {
        type: String,
        default: 'regular',
        enum: [
            'regular',
            'admin'
        ]
    },
    resetPasswordToken: {
        type: String,
        default: ''
    }
    //Referencia a los productos
   /* products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
    */
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

