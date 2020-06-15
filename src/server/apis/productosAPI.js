import { getProductosDAO } from '../dao/daoFactory.js'
import { validarProducto } from '../validaciones/productos.js'
import { crearError } from '../errores/errores.js'

function getProductosApi() {
    const productosDAO = getProductosDAO()

    async function agregar(produParaAgregar) {
      //  asegurarProductoValido(produParaAgregar)
        const produAgregado = await productosDAO.add(produParaAgregar)
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

    async function borrar(id) {
        await productosDAO.deleteById(id)
    }

    async function borrarTodos() {
        await productosDAO.deleteAll()
    }

    async function reemplazar(id, produParaReemplazar) {
        //asegurarProductoValido(produParaReemplazar)
        asegurarQueCoincidenLosIds(produParaReemplazar.id, id)
        const produReemplazado = await productosDAO.updateById(id, produParaReemplazar)
        return produReemplazado
    }

    function asegurarQueCoincidenLosIds(id1, id2) {
        if (id1 != id2) {
            throw crearError(400, 'no coinciden los ids enviados')
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
        agregar,
        buscar,
        borrar,
        borrarTodos,
        reemplazar
    }
}

export {
    getProductosApi
}