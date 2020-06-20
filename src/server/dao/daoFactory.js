import { getUsersDAOLocal } from './daoUsers.js'
import { getProductsDAOLocal } from './daoProducts.js'

function getUsersDAO() {
    return getUsersDAOLocal()
}

function getProductsDAO() {
    return getProductsDAOLocal()
}

export {
    getUsersDAO,
    getProductsDAO
}
