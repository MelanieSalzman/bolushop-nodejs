import { getProductosDaoRam } from './daoProductosArray.js'

function getProductosDAO() {
    return getProductosDaoRam()
}

export {
    getProductosDAO
}