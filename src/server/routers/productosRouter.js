import express from 'express'
import { getProductosApi } from '../apis/productosAPI.js'
import verifyToken from '../middlewares/verifyToken.js'
function getProductosRouter() {

    const router = express.Router()

    const productosAPI = getProductosApi()
//crea un producto
    router.post('/', verifyToken, async (req, res) => {
        //console.log('esto es lo que llega como request',req.body)
        const productToAdd = req.body
        const user = req.userId

        try {
            const productAdded = await productosAPI.add(productToAdd,user)
            //console.log('este es el producto que se agregó',productAdded)
            res.status(201).json(productAdded)
        } catch (err) {
            res.status(err.status).json(err)
        }
    })
//ver todos los productos
    router.get('/', async (req, res) => {

        try{
            const products = await productosAPI.findAll()
            
            res.json(products)
           // console.log('estos son todos los productos',products)
            }
            catch {
                return res.status(404).send('No products found')
            }
    })

    //ver todos los productos del vendedor
    router.get('/myProducts', verifyToken, async (req, res) => {

        try{
            const user = req.userId
            console.log('este es mi usuario que llega',user) 
            const products = await productosAPI.findProductsByUserId(user)
            
            res.json(products)
            console.log('estos son todos los productos del vendedor',products)
            }
            catch {
                return res.status(404).send('No products found')
            }
    })
//eliminar por id
    router.delete('/:id', async (req, res) => {

        try {
            await productosAPI.deleteOne(req.params.id)
            res.status(204).send('Product deleted')
        } catch (err) {
            res.status(404).send('Cannot delete')
        }

    })
//Borrar todos los productos
    router.delete('/', async (req, res) => {

        try {
            await productosAPI.deleteAll()
            res.status(204).send('All products deleted')
        } catch (err) {
            res.status(404).send('Cannot delete')
        }

    })
//modificar un producto por id
    router.put('/:id', verifyToken, async (req, res) => {

        const productToReplace = req.body
        
        //console.log('este es el producto que quiero reemplazar', productToReplace)
        try {
            let productReplaced = await productosAPI.replaceProduct(req.params.id, productToReplace)
           
            res.status(200).json(productReplaced)
           // console.log('este es el producto reemplazadao', productReplaced)
        } catch (err) {
            res.status(404).send('Cannot update')
        }
    })

    //actualizar campos de  un producto por id
    router.patch('/:id', async (req, res) => {

        const productToReplace = req.body
        try {
            let productReplaced = await productosAPI.replaceProduct(req.params.id, productToReplace)
           
            res.status(200).json(productReplaced)
        } catch (err) {
            res.status(404).send('Cannot update')
        }
    })

     //Para ver un producto por id
     router.get('/id', async (req, res) => {

        try {
            const product = await productosAPI.findById(req.params.id)
            res.status(200).json(product)
        } catch (err) {
            res.status(404).send('No product found')
        }

    })

    return router
}
export default getProductosRouter
