import { Router } from "express";
import { productoModel } from "../models/products.models.js";

const productRouter = Router ();

productRouter.get ("/", async (req,res) => {
    const {limit, page, sort, ...rest} = req.query;
    const baseUlr = `${req.headers.host}${req.baseUrl}`;
    let ordenar;

    if(sort) {
        if(sort == "asc") {
            ordenar = {precio: 1};
        } else {
            ordenar = {precio: -1};
        }
    }

    try {
        const resultado = await productoModel.paginate({},{limit, page, sort: ordenar,...rest});

        const respuesta = {
            status: resultado.status,
            payload: resultado.docs,
            totalPages: resultado.totalPages,
            prevPage: resultado.prevPage,
            nextPage: resultado.nextPage,
            page: resultado.page,
            hasPrevPage: resultado.hasPrevPage,
            hasNextPage: resultado.hasNextPage,
            prevLink: resultado.hasPrevPage ? `${baseUlr}?limit=${limit ? 10 : limit}&page=${page ? (parseInt(page) - 1) : 1}&sort=${sort}`: null,
            nextLink: resultado.hasNextPage ? `${baseUlr}?limit=${limit ? 10 : limit}&page=${page ? (parseInt(page) + 1) : 1}&sort=${sort}`: null
        }

        res.status(200).send({respuesta: "[OK]", mensaje: respuesta});
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se han podido cargar los productos"});
    }
})

productRouter.get ("/:id", async (req,res) => {
    const {pid} = req.params;

    try {
        const producto = await productoModel.findById(pid);

        if(producto) {
            res.status(200).send({respuesta: "[OK]", mensaje: producto});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el producto"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

productRouter.post ("/", async (req,res) => {
    const {titulo, descripcion, precio, codigo, stock, categoria} = req.body;

    try {
        const producto = await productoModel.create({titulo, descripcion, precio, codigo, stock, categoria});

        if(producto) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Producto creado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido creado el producto"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

productRouter.put ("/:id", async (req,res) => {
    const {pid} = req.params;
    const {titulo, descripcion, precio, codigo, stock, categoria, estado} = req.body;

    try {
        const producto = await productoModel.findByIdAndUpdate(pid,{titulo, descripcion, precio, codigo, stock, categoria, estado});

        if(producto) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Producto actualizado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido actualizar el producto"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

productRouter.delete ("/:pid", async (req,res) => {
    const {pid} = req.params;

    try {
        const producto = await productoModel.findByIdAndDelete(pid);

        if(producto) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Producto eliminado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido eliminar el producto"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

export default productRouter;