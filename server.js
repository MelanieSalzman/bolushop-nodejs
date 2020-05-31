import express from 'express'
import Joi from '@hapi/joi'

const app = express()

app.use(express.json())
app.set('json spaces', 4)

// base de datos

const productos = []
let ultimoId = 0

// rutas

app.post('/api/productos', (req, res) => {
    // console.log('POSTING: ' + req.url)

    const nuevoProdu = req.body

    try {
        asegurarProductoValido(nuevoProdu)
        asegurarProductoNoExistente(nuevoProdu)
        agregarProducto(nuevoProdu)
        res.status(201).json(nuevoProdu)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

app.get('/api/productos', (req, res) => {
    // console.log('GETTING: ' + req.url)

    const queryParams = new Map(Object.entries(req.query))
    try {
        let result
        if (queryParams.size == 0) {
            result = getAllProductos()
        } else if (queryParams.has('id')) {
            result = getProductoById(queryParams.get('id'))
        } else {
            throw { status: 400, descripcion: 'parametros de consulta invalidos' }
        }
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

app.delete('/api/productos/:id', (req, res) => {
    // console.log('DELETING: ' + req.url)

    try {
        eliminarProductoById(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }

})

app.put('/api/productos/:id', (req, res) => {
    // console.log('REPLACING: ' + req.url)

    const produActualizado = req.body
    try {
        asegurarProductoValido(produActualizado)
        asegurarQueCoincidenLosIds(produActualizado.id, req.params.id)
        reemplazarProductoById(produActualizado)
        res.json(produActualizado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

// Operaciones con la base de datos

function getAllProductos() {
    return productos
}

function getProductoById(id) {
    const productoBuscado = productos.find(p => p.id == id)
    if (!productoBuscado) {
        throw { status: 404, descripcion: 'no existe un producto con ese dni' }
    }
    return [ productoBuscado ]
}


function agregarProducto(produ) {
    produ.id = ultimoId + 1
    productos.push(produ)
    ultimoId++
}

function eliminarProductoById(id) {
    const posBuscada = productos.findIndex(p => p.id == id)
    if (posBuscada != -1) {
        productos.splice(posBuscada, 1)
    } else {
        throw { status: 404, descripcion: 'producto no encontrado' }
    }
}

function reemplazarProductoById(produ) {
    const posBuscada = productos.findIndex(p => p.id == produ.id)

    if (posBuscada == -1) {
        throw { status: 404, descripcion: 'producto no encontrado' }
    }
    productos.splice(posBuscada, 1, produ)
    return produ
}

// validaciones auxiliares

function asegurarProductoValido(producto) {
    const schema = {
        id: Joi.number().integer().min(0),
        nombre: Joi.string().alphanum().min(1).required(),
       
    }
    const { error } = Joi.validate(producto, schema);
    if (error) {
        throw { status: 400, descripcion: 'el producto posee un formato json invalido o faltan datos' }
    }
}

function asegurarProductoNoExistente(producto) {
    let existe = false
    try {
        getProductoById(producto.id)
        existe = true
    } catch (errNoExisteEntoncesTodoOk) {
        // si el estudiante no existe, no hago nada
    }
    if (existe) {
        throw { status: 400, descripcion: 'ya existe un producto con el mismo identificador' }
    }
}

function asegurarQueCoincidenLosIds(id1, id2) {
    if (id1 != id2) {
        throw { status: 400, descripcion: 'no coinciden los ids enviados' }
    }
}

const puerto = 4000
const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})