import Router from 'express'
import { mailer } from '../email.js'
import { getMailAPI } from '../apis/mailAPI.js'

function getMailRouter() {

    const router = Router()

    const mailerAPI = mailer()
    const mailAPI = getMailAPI()

    router.get('/', async (req, res) => {

        try {
            const messageId = mailerAPI.send()
        }
        catch (e) {
            console.log(e)

        }

    })

    router.post('/forgotpassword', async (req, res) => {

        const { email } = req.body
        try {
            mailAPI.forgotPassword(email)
            res.send('Mail sended')
        } catch (e) {
            res.send(e)
        }
    })

    router.post('/recoverpassword', async (req, res) => {

        const { code } = req.body
        const { email } = req.body
        let recover = false
        try {
            recover = await mailAPI.recoverPassword(email, code)
            console.log('recover de la funcion', recover)

            if (recover) {
                console.log('paso por success')
                res.send('Recover with success')
            }
            else {
                console.log('paso por error')
                res.send('Cannot recover')
            }
        } catch (e) {
            res.send(e)
        }
    })

    router.post('/resetpassword', async (req, res) => {

        let { password } = req.body
        let { email } = req.body
        let reseted = false
        try {
            console.log('paso por aca')
            reseted = await mailAPI.resetPassword(email, password)
            if (reseted) {
                res.send('Su contraseña fue actualizada con exito')
            }
            else{
                res.send('Error al actualizar la contraseña')
            }
        }
        catch(e){
            res.send(e)
        }
    })

    return router
}

export default getMailRouter