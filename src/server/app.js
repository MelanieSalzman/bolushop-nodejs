import express from 'express'

import { getProductosRouter } from './routers/productosRouter.js'

function crearApp() {

    const app = express()

    app.use(express.json())
    app.set('json spaces', 4)

    app.use('/api/productos', getProductosRouter())

    return app
}

export default crearApp
