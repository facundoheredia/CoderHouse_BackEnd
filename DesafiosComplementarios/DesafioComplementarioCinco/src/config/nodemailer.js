import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "arq.facundoheredia@gmail.com",
        pass: "cursobackend2023",
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