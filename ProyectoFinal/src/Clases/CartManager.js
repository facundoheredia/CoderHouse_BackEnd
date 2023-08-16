import { leerDeArchivo,escribirEnArchivo } from "../FileSystem.js";

export class CartManager {
    constructor (path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(product) {
        const {id,quantity} = product;
        const productoExistente = this.products.find(producto => producto.id === id)

        if (productoExistente) {
            productoExistente.quantity+= quantity;
        } else {
            const nuevoProducto = {id,quantity};
            this.products.push(nuevoProducto);
            escribirEnArchivo(this.path,this.products);
        }
    }
}