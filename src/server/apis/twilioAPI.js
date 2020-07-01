import { sendRandomWhatsApp } from "../twilio.js"

function getTwilioAPI() {
 
    async function sendWppMessages(mobileNumber) {
       const wppResult = sendRandomWhatsApp(mobileNumber)
       return wppResult
    }

  return {
    sendWppMessages
  }

}

export { getTwilioAPI }
