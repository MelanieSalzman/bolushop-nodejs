import { getUsersDAOLocal } from './daoUsers.js'

function getUsersDAO() {
    return getUsersDAOLocal()
}

export {
    getUsersDAO
}