//  ---- [IMPORTACIONES] ----
import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { deleteUser, getUser, getUsers, postRecoverPassword, postRecoverPasswordToken, putUser, subirDocumento } from "../controller/users.controller.js";
import upload from "../config/multer.js"

const usuarioRouter = Router ();

usuarioRouter.get ("/", passportError("jwt"), authorization("admin"), getUsers);
usuarioRouter.get ("/:uid", passportError("jwt"), authorization("user"), getUser);
usuarioRouter.put ("/:uid", passportError("jwt"), authorization("user"), putUser);
usuarioRouter.delete ("/:uid", passportError("jwt"), authorization("user"), deleteUser);
usuarioRouter.post ("/recupararContrasenia", postRecoverPassword);
usuarioRouter.post("/recupararContrasenia/:token", postRecoverPasswordToken);
usuarioRouter.post("/:uid/documentos", passportError("jwt"), authorization("user"), upload.array("documentos"), subirDocumento);

export default usuarioRouter;