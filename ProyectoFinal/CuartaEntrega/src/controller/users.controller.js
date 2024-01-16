import {usuarioModel} from "../models/users.models.js";
import { sendRecoveryMail } from "../config/nodemailer.js";
import crypto from "crypto";

const recoveryLinks = {};

export const getUsers = async (req,res) => {
    try {
        const usuariosServidor = await usuarioModel.find();
        const usuarios = [];
        
        usuariosServidor.forEach(usuario =>usuarios.push({nombre: usuario.nombre, email: usuario.email, rol: usuario.rol}));

        if(usuarios.length != 0) {
            res.status(200).send({respuesta: "[OK]", mensaje: usuarios});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se han podido encontrar a los usuarios"});
        }

    } catch(error) {
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se han podido cargar los usuarios"});
    }
}

export const getUser = async (req,res) => {
    const {uid} = req.params;

    try {
        const usuario = await usuarioModel.findById(uid);

        if(usuario) {
            res.status(200).send({respuesta: "[OK]", mensaje: usuario});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el usuario"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}

export const putUser = async (req,res) => {
    const {uid} = req.params;
    const {nombre, apellido, edad, email, contrasenia} = req.body;

    try {
        const usuario = await usuarioModel.findByIdAndUpdate(uid,{nombre, apellido, edad, email, contrasenia});

        if(usuario) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Usuario actualizado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido actualizar el usuario"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}

export const deleteUser = async (req,res) => {
    const {uid} = req.params;
    const periodoDeInactividad = 172800000; //milisegundos para 2 dias

    try {
        const usuario = await usuarioModel.findById(uid);
        const inactividad = Date.now() - usuario.ultimaConexion;

        if(inactividad > periodoDeInactividad) {
            const usuario = await usuarioModel.findByIdAndDelete(uid);
            if(usuario) {
                res.status(200).send({respuesta: "[OK]", mensaje: "Usuario eliminado correctamente"});
            } else {
                res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido eliminar el usuario"});
            }
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido eliminar el usuario ya que no a estado 2 dias inactivos"});
        }


    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}

export const postRecoverPassword = async (req,res) => {
    const {email} = req.body;

    try {
        const token = crypto.randomBytes(20).toString("hex");

        recoveryLinks[token] = { email: email, timestamp: Date.now()}

        const recoveryLink = `http://localhost:4000/api/usuarios/recuperarContrasenia/${token}`
    
        sendRecoveryMail(email,recoveryLink);

        res.status(200).send("Correo de recuperacion enviado")
    } catch (error) {
        res.status(5000).send (`Error al enviar el mail ${error}`)
    }
}

export const postRecoverPasswordToken = async (req,res) => {
    const {token} = req.params;
    const {newPassword, newPassword2} = req.body;

    try {
        const linkData = recoveryLinks[token];

        if(linkData && (Date.now() - linkData.timestamp <= 3600000)) {
            const {email} = linkData;

            if(newPassword == newPassword2) {
                delete recoveryLinks[token];
                res.status(200).send("Contraseña modificada correctamente")
            } else {
                res.status(400).send("Las contraseñas deben ser identicas")
            }
        } else {
            res.status(400).send("Token invalido o expirado. Prueba nuevamente")
        }
    } catch (error) {
        res.status(500).send("Error al modificar contraseña", error)
    }
}

export const subirDocumento = async (req,res) => {
    const {uid} = req.params;
    const documentos = req.files;

    try {
        const usuario = await usuarioModel.findById(uid);

        if(usuario) {
            documentos.forEach(documento => {
                usuario.documentos.push({nombre: documento.filename, referencia: documento.path})
            });

            await usuarioModel.findByIdAndUpdate(uid,usuario);

            res.status(200).send({respuesta: "[OK]", mensaje: "La imagen fue subida correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el usuario"});
        }
    } catch(error) {
        console.log(`Este es el error: ${error}`)
        res.status(400).send({respuesta: "[ERROR]", mensaje: error})
    }
}