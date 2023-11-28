import {usuarioModel} from "../models/users.models.js";

export const getUsers = async (req,res) => {
    try {
        const usuarios = await usuarioModel.find();

        if(usuarios) {
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

    try {
        const usuario = await usuarioModel.findByIdAndDelete(uid);

        if(usuario) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Usuario eliminado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido eliminar el usuario"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}