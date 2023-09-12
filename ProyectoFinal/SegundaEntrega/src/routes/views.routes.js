import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", async (req,res) => {
    res.render("home",{
        title:"Home",
        js:"script.js"
    });
})

viewsRouter.get("/productos", async (req,res) => {
    res.render("productos",{
        title:"Productos",
        js:"productos.js"
    });
})

viewsRouter.get("/carritos", async (req,res) => {
    res.render("carritos",{
        title:"Carritos",
        js:"carritos.js"
    });
})

viewsRouter.get("/:detalleCarrito", async (req,res) => {
    res.render("carritoDetalle",{
        title:"Detalle del carrito",
        js:"carritoDetalle.js"
    });
})

viewsRouter.get("/mensajes", async (req,res) => {
    res.render("mensajes",{
        title:"Mensajes",
        js:"mensajes.js"
    });
})

export default viewsRouter;