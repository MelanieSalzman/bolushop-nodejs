import { getUsersDAOLocal } from './daoUsers.js'
import { getProductosDaoRam } from './daoProductosArray.js'

function getUsersDAO() {
    return getUsersDAOLocal()
}

function getProductosDAO() {
    return getProductosDaoRam()
}

export {
    getUsersDAO,
    getProductosDAO
}
