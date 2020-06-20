import { crearError } from '../errores/errores.js'

function getProductosDaoRam() {

    const productos = []
    let proxId = 0

    async function getAll() {
        return productos
    }

 

    async function getById(id) {
        const buscado = productos.find(e => e.id == id)
        if (!buscado) {
            throw crearError(404, 'producto no encontrado con ese id')
        }
        return [buscado]
    }

    async function add(produNuevo) {
        let pude = false

        try {
            await getById(produNuevo.id)
        } catch (err) {
            produNuevo.id = proxId
            proxId++
            productos.push(produNuevo)
            pude = true
        }

        if (pude) {
            return produNuevo
        } else {
            throw crearError(400, 'ya existe un producto con ese id')
        }
    }

    async function deleteById(id) {
        const posBuscada = productos.findIndex(e => e.id == id)
        if (posBuscada == -1) {
            throw crearError(404, 'producto no encontrado con ese ID')
        }
        productos.splice(posBuscada, 1)
    }

    async function deleteAll() {
        productos.splice(0, productos.length)
    }

    async function updateById(id, nuevoProdu) {
        const posBuscada = productos.findIndex(e => e.id == id)
        if (posBuscada == -1) {
            throw crearError(404, 'producto no encontrado con ese ID')
        }
        productos.splice(posBuscada, 1, nuevoProdu)
        return nuevoProdu
    }

    return {
        getAll,
        getById,
        add,
        deleteById,
        deleteAll,
        updateById
    }
}

export {
    getProductosDaoRam
}