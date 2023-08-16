//IMPORTACIONES
import express from "express";
import productsRouter from "../routes/products.routes.js";
import cartRouter from "../routes/carts.routes.js";

//Especificar puerto
export const PORT = 4000;

//Generar una instancia de express en app
export const APP = express();

//Hacer que express use JSON
APP.use(express.json());
//Permitir largas querys
APP.use(express.urlencoded({extended: true}));
//Rutas
APP.use("/api/products",productsRouter);
APP.use("/api/carts",cartRouter);

export function servidorMenuPrincipal () {
    let mensajeDeInicio = "<h1>[SERVIDOR]</h1>";

    mensajeDeInicio += "<h4>[=======================]</h4>";
    mensajeDeInicio += "<h4>[1] => PAGINA PRINCIAL</h4>";
    mensajeDeInicio += "<p>Esta es la url de la pagina principal del servidor. URL: http://localhost:4000/api/</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/api/>[PAGINA PRINCIPAL]</a>";
    mensajeDeInicio += "<p>Para poder ingresar y utilizar las otras funciones del servidor continue leyendo.</p>";
    mensajeDeInicio += "<h4>[2] => LISTA DE TODOS LOS PRODUCTOS</h4>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los productos guardados en el servidor. URL: http://localhost:4000/api/products</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/api/products>[PRODUCTOS]</a>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los productos guardados en el servidor segun un limite indicado.</p>";
    mensajeDeInicio += "Se debera usar el url de products agregandole .../?limit=2 al final segun el limite que se quiera mostrar.";
    mensajeDeInicio += "<p>URL: http://localhost:4000/api/products/?limit=2</p>";
    mensajeDeInicio += "<h4>[3] => CARGAR NUEVO PRODUCTO</h4>";
    mensajeDeInicio += "<p>Proximamente.</p>";
    mensajeDeInicio += "<h4>[4] => BUSCAR UN PRODUCTO POR ID</h4>";
    mensajeDeInicio += "<p>Se debera usar el url de products agregandole .../1 al final segun la id del producto buscado.</p>";
    mensajeDeInicio += "<p>URL: http://localhost:4000/api/products/1</p>";
    mensajeDeInicio += "<h4>[5] => MODIFICAR UN PRODUCTO</h4>";
    mensajeDeInicio += "<p>Proximamente.</p>";
    mensajeDeInicio += "<h4>[6] => BORRAR UN PRODUCTO</h4>";
    mensajeDeInicio += "<p>Proximamente.</p>";
    mensajeDeInicio += "<h4>[=======================]</h4>";

    return mensajeDeInicio;
}