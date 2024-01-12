import { usuarioModel } from "../models/users.models.js";
import {generateToken} from "../utils/jwt.js";

export const login = async (req,res) => {
    try {
        if(!req.user) {
            res.status(401).send({mensaje: "usuario invalido"});
        } else {
            const token = generateToken(req.user);
            const usuario = await usuarioModel.findOne({email:req.user.email})
            usuario.ultimaConexion = Date.now()
            await usuarioModel.findByIdAndUpdate(usuario._id,{usuario})
            console.log(usuario)
            res.status(200).send({token});
        }
    } catch (error) {
        res.status(500).send({mensaje: `[ERROR] - error al iniciar sesion ${error}`});
    }
}

export const signUp = async (req,res) => {
    try {
        if(!req.user) {
            res.status(400).send({mensaje: "usuario ya existente"});
        } 
       
        res.status(200).send({mensaje: "usuario registrado"});
    } catch (error) {
        res.status(500).send({mensaje: `[ERROR] - error al registrar usuario ${error}`});
    }
}

export const logOut = async (req,res) => {
    const usuario = await usuarioModel.findOne({email:req.user.email})
    usuario.ultimaConexion = Date.now()
    await usuarioModel.findByIdAndUpdate(usuario._id,{usuario})
    
    res.clearCookie("jwtCookie");
    res.status(200).send({resultado: "Usuario deslogueado"})
}