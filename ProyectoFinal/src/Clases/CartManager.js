import { leerDeArchivo,escribirEnArchivo } from "../FileSystem.js";
import { Cart } from "./Cart.js";
import { productManagerServer } from "../routes/products.routes.js";

export class CartManager {
    constructor (path) {
        this.carts = [];
        this.path = path;
    }

    async addCart() {
        let resultadoOperacion = 0;
        const nuevoCarrito = new Cart ();
        
        this.carts = await this.getCarts();
        this.carts.push(nuevoCarrito);
        
        escribirEnArchivo(this.path,this.carts);

        return resultadoOperacion;
    }

    //Se encarga de retornar todos los productos en el archivo JSON
    async getCarts() {
        const arrayDeCarts = await leerDeArchivo(this.path);

        return arrayDeCarts;
    }

    async getCartById(cid) {
        const arrayDeCarts = await this.getCarts();
        const cartBuscado = arrayDeCarts.find(cart => cart.id === cid);

        return cartBuscado;
    }

    async addProductToCart (cid,pid) {
        const cartEncontrado = await this.getCartById(cid);
        const productoEncontrado = await productManagerServer.getProductById(pid);
        let resultadoOperacion;

        if(cartEncontrado) {
            console.log("[ENTRE AL CART ENCONTRADO]")
            if(productoEncontrado) {
                console.log("[ENTRE AL PRODUCT ENCONTRADO]")
                const productosEnCarrito = await this.getProductsFromCart(cid);

                if(productosEnCarrito.length !== 0) {
                    const producto = productosEnCarrito.find(producto => producto.id === pid);
                    console.log(producto)
                    producto.quantity++;
                    resultadoOperacion = 1;
                } else {
                    productosEnCarrito.push({id:productoEncontrado.id,quantity: 1});
                    resultadoOperacion = 0;
                }
            } else {
                resultadoOperacion -2;
            }
        } else {
            resultadoOperacion -1;
        }

        return resultadoOperacion;
    }

    async getProductsFromCart (cid) {
        const carritoEncontrado = await this.getCartById(cid);

        return carritoEncontrado.products;
    }
}