import { getProductsDAO } from '../dao/daoFactory.js'
import { validarProducto } from '../validaciones/productos.js'
import { crearError } from '../errores/errores.js'

function getProductosApi() {
    const productosDAO = getProductsDAO()

    async function add(produParaAgregar, user) {
        //  asegurarProductoValido(produParaAgregar)
        const produAgregado = await productosDAO.create(produParaAgregar, user)
        console.log('este es el producto creado', produAgregado)

        await productosDAO.save(produAgregado)
        console.log('pasó por el save')
        return produAgregado

    }

    async function buscar(queryParams) {
        let result
        if (queryParams.size == 0) {
            result = await productosDAO.getAll()
        } else if (queryParams.has('id')) {
            result = await productosDAO.getById(queryParams.get('id'))
        } else {
            throw crearError(400, 'parametros de consulta invalidos')
        }
        return result
    }


    async function deleteOne(id) {
        await productosDAO.deleteOne(id)
    }


    async function deleteAll() {
        await productosDAO.deleteAll()
    }

    //reemplaza un producto
    async function replaceProduct(id, producto) {

        let productCreated = await productosDAO.create(producto)

        let productReplaced = await productosDAO.replaceProduct(id, productCreated)
        return productReplaced
    }
    async function findById(productId) {
        const product = await productosDAO.findById(productId)
        return product
    }

    async function findAll() {
        const productos = await productosDAO.findAll()
        return productos
    }

    async function findProductsByUserId(user) {
        const productos = await productosDAO.findProductsByUser(user)
        return productos
    }

    async function verifyUserOfProduct(user, productId) {
        let verified = false
        const product = await productosDAO.findById(productId)
      
        if ((product.user) == user) {
            verified = true
          
        }
       
        return verified

       
    }

    async function rate(rating, idProduct){
        const product = await productosDAO.findById(idProduct)

        if(product){
            if(rating){
             const added = await productosDAO.addPositive(idProduct)
            }
        }
    }

    /* function asegurarProductoValido(producto) {
         try {
             validarProducto(producto)
         } catch (error) {
             throw crearError(400, 'el producto posee un formato json invalido o faltan datos')
         }
     }
     */

    return {
        add,
        findAll,
        findById,
        deleteOne,
        deleteAll,
        buscar,
        replaceProduct,
        findProductsByUserId,
        verifyUserOfProduct,
        rate
    }
}

export {
    getProductosApi
}