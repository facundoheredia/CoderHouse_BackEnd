//IMPORTACIONES
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productsRouter from "../routes/products.routes.js";
import usersRouter from "../routes/users.routes.js";
import cartsRouter from "../routes/carts.routes.js";
import mensajeRouter from "../routes/messages.routes.js";
import viewRouter from "../routes/views.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "../Path.js";
import path from "path";

//Especificar puerto
export const PORT = 4000;

//Generar una instancia de express en app
export const APP = express();

export const httpServer = APP.listen(PORT, () => {
    console.log(`[SERVIDOR EN PUERTO ${PORT}]`);
    console.log(`[INGRESE A http://localhost:4000/views/ PARA CONTINUAR]`);
});

export function serverConfiguracionInicial () {
    //Motor de render a utilizar
    APP.engine("handlebars", engine());

    appSetUpSetConfig ();
    appSetUpUseConfig ();
    appSetUpUseRoutes ();
}

function appSetUpSetConfig () {
    //Seteado de aplicacion
    APP.set("view engine","handlebars");
    //Donde estan las vistas
    APP.set("views",path.resolve(__dirname,"./views"));
}

function appSetUpUseConfig () {
    //Hacer que express use JSON
    APP.use(express.json());
    //Permitir largas querys
    APP.use(express.urlencoded({extended: true}));
}

function appSetUpUseRoutes () {
    //Rutas
    APP.use("/api/productos",productsRouter);
    APP.use("/api/usuarios",usersRouter);
    APP.use("/api/carritos",cartsRouter);
    APP.use("/api/mensajes",mensajeRouter);
    APP.use("/views",viewRouter);
    APP.use("/views",express.static(path.join(__dirname,"/public")));
}

//Conectarse a la base de datos de mongo
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("[MONGO DB] CONEXION REALIZADA CON EXITO"))
.catch(() => console.log("[MONGO DB] CONEXION FALLIDA"));