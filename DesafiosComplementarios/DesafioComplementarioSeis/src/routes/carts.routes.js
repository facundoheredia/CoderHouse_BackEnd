import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { deleteCarrito, deleteProductosEnCarrito, getCarrito, getCarritos, postProductoEnCarrito, putCarrito, putProductosEnCarrito, postCompra } from "../controller/carts.controller.js";

const cartRouter = Router ();

cartRouter.get ("/", passportError("jwt"), authorization("admin"), getCarritos);
cartRouter.get ("/:cid", passportError("jwt"), authorization("user"), getCarrito);
cartRouter.post ("/:cid/compra", passportError("jwt"), authorization("user"), postCompra);
cartRouter.post ("/:cid/productos/:pid", passportError("jwt"), authorization("user"), postProductoEnCarrito);
cartRouter.put ("/:cid", passportError("jwt"), authorization("user"), putCarrito);
cartRouter.put ("/:cid/productos/:pid", passportError("jwt"), authorization("user"), putProductosEnCarrito);
cartRouter.delete ("/:cid/productos/:pid", passportError("jwt"), authorization("user"), deleteProductosEnCarrito);
cartRouter.delete ("/:cid", deleteCarrito);

export default cartRouter;