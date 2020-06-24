import Router from 'express'
import {mailer} from '../email.js'
import {getMailAPI} from '../apis/mailAPI.js'

function getMailRouter() {

    const router = Router()

    const mailerAPI = mailer()
    const mailAPI = getMailAPI()

    router.get('/', async (req, res) => {

        try{
        const messageId = mailerAPI.send()}
        catch(e){
            console.log(e)

        }

    })

    router.post('/forgotPassword', async (req, res) => {

        const {email} = req.body
       mailAPI.forgotPassword(email)

    })

    return router
}

export default getMailRouter