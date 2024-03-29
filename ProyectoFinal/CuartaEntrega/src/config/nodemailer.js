import "dotenv/config";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "arq.facundoheredia@gmail.com",
        pass: process.env.SESSION_SECRET,
        authMethod: "LOGIN"
    }
})

export const sendRecoveryMail = (email, recoveryLink) => {
    const mailOpcions = {
        from: "arq.facundoheredia@gmail.com",
        to: email,
        subject: "Link de reestablecer su contraseña",
        text: `Haga click en el siguiente enlace para reestablecer su contraseña: ${recoveryLink}`
    }

    transport.sendMail(mailOpcions,(error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log("Email enviado correctamente")
        }
    })
}

export const sendElimitadAccountMail = (email) => {
    const mailOpcions = {
        from: "arq.facundoheredia@gmail.com",
        to: email,
        subject: "Su cuenta fue eliminada",
        text: `Le informamos que su cuenta fue eliminada por inactividad de 2 dias.`
    }

    transport.sendMail(mailOpcions,(error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log("Email enviado correctamente")
        }
    })
}