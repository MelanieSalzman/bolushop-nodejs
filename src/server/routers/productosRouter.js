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
        console.log('productToAdd', req.body)
        console.log('user', req.userId)

        try {
            const productAdded = await productosAPI.add(productToAdd, user)
            //console.log('este es el producto que se agregó',productAdded)
            res.status(201).json(productAdded)
        } catch (err) {
            res.status(err.status).json(err)
        }
    })
    //ver todos los productos
    router.get('/', async (req, res) => {

        try {
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

        try {
            const user = req.userId
            console.log('este es mi usuario que llega', user)
            const products = await productosAPI.findProductsByUserId(user)

            res.json(products)
            console.log('estos son todos los productos del vendedor', products)
        }
        catch {
            return res.status(404).send('No products found')
        }
    })
    //eliminar por id
    router.delete('/:id', verifyToken, async (req, res) => {


        const productId = req.params.id
        const user = req.userId


        try {
            let userVerified = await productosAPI.verifyUserOfProduct(user, productId)
            if (userVerified) {
                await productosAPI.deleteOne(productId)
                res.status(204).send('Product deleted')
            }else{
                res.status(404).send('User not verified')    
            }

        } catch (err) {
            res.status(404).send('Cannot delete')
        }

    })
        //modificar un producto por id
    router.put('/:id', verifyToken, async (req, res) => {

        const productToReplace = req.body
        const user = req.userId
        const productId = req.params.id


        //console.log('este es el producto que quiero reemplazar', productToReplace)
        try {
            console.log('user', user)
            console.log('prodcuctID', productId)
            let userVerified = await productosAPI.verifyUserOfProduct(user, productId)

            console.log('esto es lo que me devuelve el usuario verificado', userVerified)
            if (userVerified) {
                let productReplaced = await productosAPI.replaceProduct(productId, productToReplace)
                res.status(200).json(productReplaced)
            }else{
                res.status(404).send('User not verified')
            }

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
    router.get('/:id', async (req, res) => {

        try {
            const product = await productosAPI.findById(req.params.id)
            res.status(200).json(product)
        } catch (err) {
            res.status(404).send('No product found')
        }

    })
    //Borrar todos los productos
    /*router.delete('/', async (req, res) => {

        try {
            await productosAPI.deleteAll()
            res.status(204).send('All products deleted')
        } catch (err) {
            res.status(404).send('Cannot delete')
        }
        

    })
    */
   router.post('/rating/:id', verifyToken, async (req, res) => {
      
    const rating = req.body.rating
  console.log(rating)
    console.log('este es el rating que me llega en el body', rating)

    try {
        const ratingAdded = await productosAPI.rate(rating, req.params.id)
        res.status(201).json(ratingAdded)
    } catch (err) {
        res.status(err.status).json(err)
    }
})


    return router
}
export default getProductosRouter

