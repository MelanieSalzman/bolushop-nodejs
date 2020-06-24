import config from '../../config.js'
import jwt from 'jsonwebtoken'
import { getUsersDAO } from '../dao/daoFactory.js'
import nodemailer from 'nodemailer'

function getMailAPI() {

    const usersDAO = getUsersDAO()

    async function forgotPassword(email) {
        const user= await find(email)
        if(user!=null){
        const token = await genToken(email)
        const userUpdated = await updateTokenFromUser(user,token)
        await sendEmail(token)
        }
        return user
    }

    async function sendEmail(token) {
        
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
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<b>Accede a este link para recuperar la contraseña </b>
        <p>http://localhost:3000/resetpassword/${token}</p>]`, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        return info.messageId
      }

    async function updateTokenFromUser(user,token) {
        const userUpdated = await usersDAO.updateTokenFromUser(user._id,token)

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

        let userUpdated = await usersDAO.changePassword(userToBeUpdated,newpassword)
        userUpdated = await usersDAO.encryptPassword(userUpdated)
        //user.save() para guardar en la bd
        await usersDAO.replaceUser(userUpdated._id,userUpdated)

        return userUpdated
    }

    return {
        forgotPassword,
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