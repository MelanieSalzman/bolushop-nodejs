import config from '../../config.js'
import jwt from 'jsonwebtoken'
import { getUsersDAO } from '../dao/daoFactory.js'
import nodemailer from 'nodemailer'
import Str from '@supercharge/strings'

function getMailAPI() {

    const usersDAO = getUsersDAO()

    async function forgotPassword(email) {
        const user= await find(email)
        if(user!=null){

        const code = Str.random(6)
        const userUpdated = await updateCodeFromUser(user,code)
        await sendEmail(code)
        }
        return user
    }

    async function recoverPassword(email, code) {
        
        let recover = false
        const user= await find(email)
        console.log('user',user)
        if(user!=null&&code!=''){
            console.log('reset', user.resetPasswordCode)
            console.log('code', code)
            console.log('user', user)
            console.log('son iguales', user.resetPasswordCode == code)
        if(user.resetPasswordCode == code){
        recover = true
        const userUpdated = await updateCodeFromUser(user,'')
        }
        }
        console.log('recover', recover)
        return recover
    }

    async function resetPassword(email, password) {
        
        let reseted = false
        let user= await find(email)
        if(user!=null&&password!=''){
            try{
            let userUpdated = await replacePassword(user,password)

            reseted = true
            }
            catch(e){
            
            }}
        return reseted
    }

    async function sendEmail(code) {
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_PASS, // generated ethereal password
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Bolushop 👻" <noe74@ethereal.email>', // sender address
          to: "jessica63@ethereal.email , jessica63@ethereal.email", // list of receivers
          subject: "Recupera la contraseña en Bolushop ✔", // Subject line
          text: "Olvidaste tu contraseña? No te preocupes :)", // plain text body
          html: `<p>Ingresa el siguiente codigo en Bolushop para generar una nueva contraseña: </p>
        <b>${code}</b>`, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        return info.messageId
      }

    async function updateCodeFromUser(user,code) {
        const userUpdated = await usersDAO.updateCodeFromUser(user._id,code)

        return userUpdated
    }


    async function find(email) {
        const user = await usersDAO.findByEmailWithPass(email)

        return user
    }

    async function findById(UserId) {
        const user = await usersDAO.findById(UserId)
        return user
    }

    async function validatePass(user, password) {
        const validPassword = await usersDAO.validatePassword(user, password)
        return validPassword
    }

    async function findByEmail(user) {
        let exist = false
        const userFounded = await usersDAO.findByEmail(user.email)

        if (userFounded != null) {
            exist = true

        }

        return exist
    
    }

    async function findByUserName(user) {
        let exist = false
        const userFounded = await usersDAO.findByUserName(user.username)

        if (userFounded != null) {
            exist = true

        }

        return exist
    
    }

    async function genToken(email) {

        //payload es lo que contendra el token
        let payload = {
            email: email
        }
        const token = jwt.sign(payload, config.secretForgotPassword, {
            expiresIn: 60 * 60 * 24
        })

        return token
    }

    async function replacePassword(userToBeUpdated,newpassword) {
        let userUpdated = await usersDAO.changePass(userToBeUpdated,newpassword)
        console.log('este es el usuario actualizado despues de cambiar la contraseña',userUpdated)
        userUpdated = await usersDAO.encryptPassword(userUpdated)
        //user.save() para guardar en la bd
        
        await usersDAO.replaceUser(userToBeUpdated._id,userUpdated)

        return userUpdated
    }

    return {
        forgotPassword,
        recoverPassword,
        resetPassword,
        find,
        findById,
        findByEmail,
        validatePass,
        genToken,
        findByUserName,
        replacePassword
    }
}

export {
    getMailAPI
}