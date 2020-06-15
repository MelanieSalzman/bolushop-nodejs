import Joi from '@hapi/joi'

function validarProductos(productos) {
    for (const producto of productos) {
        validarProducto(producto)
    }
}

function validarProducto(producto) {
    const productoSchema = {
        id: Joi.number().integer().min(0),
        nombre: Joi.string().alphanum().min(1).required(),
        precio: Joi.number().integer().min(0),
        descripcion: Joi.string().alphanum().min(1).required(),
        detalles: Joi.string().alphanum().min(1).required(),
        web:Joi.string().alphanum().min(1).required(),
    }
    const { error } = Joi.validate(producto, productoSchema)
    if (error) {
        // throw error
        throw { message: error.message }
    }
}


export {
    validarProducto,
    validarProductos,

}