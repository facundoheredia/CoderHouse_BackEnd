import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { getProductos,getProducto,postProducto,putProducto,deleteProducto } from "../controller/products.controller.js";
import { crearListaDeProductosFaker } from "../test/fakerProductos.js";

const productRouter = Router ();

productRouter.get ("/", getProductos);
productRouter.get ("/:pid", getProducto);
productRouter.post ("/", postProducto);
productRouter.post ("/productoFaker", crearListaDeProductosFaker);
productRouter.put ("/:pid", putProducto);
productRouter.delete ("/:pid", deleteProducto);


export default productRouter;

/*
productRouter.post ("/", passportError("jwt"), authorization("admin"), postProducto);
productRouter.put ("/:pid", passportError("jwt"), authorization("admin"), putProducto);
productRouter.delete ("/:pid", passportError("jwt"), authorization("admin"), deleteProducto);
*/