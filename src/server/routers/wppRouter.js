import Router from "express"
import { getTwilioAPI } from "../apis/twilioAPI.js"

const getWppRouter = () => {
    const router = Router()
    const wppApi = getTwilioAPI()

    router.post('/send', async (req, res) => {
        const { mobileNumber } = req.body
        console.log(mobileNumber)
        try 
        {
          const wppResult = await wppApi.sendWppMessages(mobileNumber)
          console.log("Wpp result --> ", wppResult);
          res.send("Wpp mensaje mandado correctamente!!!!!!!!!!!! :)")
        }
        catch(e){
            console.log(e)
        }
    })

    return router
}

export default getWppRouter


//hola yo soy el post con el numero ----> hola soy la Api, q lindo numero, toma tu wpp --> twilio --> wpp