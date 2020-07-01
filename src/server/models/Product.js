import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
  
    description: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
        
    },
    web: {
        type: String,
        required: true
        
    },

   // Referencia a los usuarios
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating:{
        type: Number,
        required: false,
        default : 0

   
    }

 



});



const Product = mongoose.model('Product', productSchema);

export default Product

