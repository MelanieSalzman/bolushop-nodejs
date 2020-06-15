import express from 'express'
import { getProductosApi } from '../apis/productosAPI.js'

function getProductosRouter() {

    const router = express.Router()

    const productosAPI = getProductosApi()

    router.post('/', async (req, res) => {

        const produParaAgregar = req.body

        try {
            const produAgregado = await productosAPI.agregar(produParaAgregar)
            res.status(201).json(produAgregado)
        } catch (err) {
            res.status(err.status).json(err)
        }
    })

    router.get('/', async (req, res) => {

        try {
            const queryParams = new Map(Object.entries(req.query))
            const productos = await productosAPI.buscar(queryParams)
            res.json(productos)
        } catch (err) {
            res.status(err.status).json(err)
        }
    })

    router.delete('/:id', async (req, res) => {

        try {
            await productosAPI.borrar(req.params.id)
            res.status(204).send()
        } catch (err) {
            res.status(err.status).json(err)
        }

    })

    router.delete('/', async (req, res) => {

        try {
            await productosAPI.borrarTodos()
            res.status(204).send()
        } catch (err) {
            res.status(err.status).json(err)
        }

    })

    router.put('/:id', async (req, res) => {

        const produParaReemplazar = req.body
        try {
            const produReemplazado = await productosAPI.reemplazar(req.params.id, produParaReemplazar)
            res.json(produReemplazado)
        } catch (err) {
            res.status(err.status).json(err)
        }
    })

    return router
}
export default getProductosRouter