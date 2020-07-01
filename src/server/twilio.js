import dotenv from 'dotenv'
import twilio from "twilio"
dotenv.config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = twilio(accountSid, authToken); 

const messagesArray = [
    "Sabias que, la superficie de Rusia es más grande que la superficie de Plutón?",
    "Sabias que, el planeta pesa 6 cuatrillones de kilogramos",
    "Sabias que, los sapos cuando algo les cae mal en el estómago no vomitan lo que lea cayó mal sino que vomitan su estómago (lo saca por su boca) lo limpia con sus patitas y se lo vuelve a tragar",
    "Sabias que, la voz que escuchamos en  nuestra mente siempre es en un mismo volumen"
]
const randomMessages = () => {
    return messagesArray[Math.floor(Math.random() * messagesArray.length) ]
}

export const sendRandomWhatsApp = async (mobileNumber) => {
   const wppResult = await client.messages 
    .create({ 
       body: randomMessages(), 
       from: `whatsapp:${process.env.TWILIO_NUMBER}`,       
       to: `whatsapp:${mobileNumber}`
     }) /* 
     .then(message => console.log(message.sid)) 
     .done(); */
     
     console.log(wppResult);
     return wppResult
}