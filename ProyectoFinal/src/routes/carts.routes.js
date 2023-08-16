import { Router } from "express";
import {CartManager} from "../Clases/CartManager.js";
import {__dirname} from "../Path.js";

//CONSTANTES
const pathCartServidor = __dirname + "/models/Carts.json";
const cart = new CartManager (pathCartServidor);
const cartRouter = Router();

cartRouter.get("/", async (req,res) => {
    let limit = parseInt(req.query.limit);
    const arrayDeProductos = await cart.getProducts();

    if(arrayDeProductos) {
        if(!limit) {
            res.status(200).send(arrayDeProductos);
        } else {
            res.status(200).send(arrayDeProductos.slice(0,limit));
        }
    } else {
        res.status(404).send("No hay ningun Producto");
    }
})

cartRouter.get("/:pid", async (req,res) => {
    const pid = parseInt(req.params.pid)
    const productoBuscado = await cart.getProductById(pid);

    if(productoBuscado) {
        res.status(200).send(productoBuscado);
    } else {
        res.status(400).send("Producto no encontrado");
    }
})

cartRouter.post("/", async (req,res) => {
    const code = req.body;
    const confirmacion = await cart.getProductByCode(code);

    if(confirmacion) {
        req.status(400).send("Product ya creado");
    } else {
        const conf = await cart.addProduct(req.body);
        if(conf) {
            req.status(200).send("Product creado");
        } 
    }
})

export default cartRouter;