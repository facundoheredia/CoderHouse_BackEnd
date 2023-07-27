import { Product } from "./Product.js";

//GENERACION DE CLASE PRODUCT MANAGER
export class ProductManager {
    //CONSTRUCTOR
    constructor() {
        this.products = [];
        this.idAutoIncremental = 0;
    }

    //METODOS
    //Agrega productos al array products de la clase ProductManager
    addProduct (product) {
        let {title, description, price, thumbnail, id, stock} = product;
        
        //Busqueda del id del producto en la lista de ProductManager
       if(title && description && price && thumbnail && stock) {
            if(id) {
                console.log(`Buscar este id [${id}]`)
                const productExistente = this.getProductById (id);

                if(productExistente === "Not found") {
                    const nuevoProducto = new Product (title, description, price, thumbnail, id, stock)
                    this.products.push(nuevoProducto);
                    this.setLastIdAutoIncremental (id);
                    console.log(`[OK] -> El producto [${title}] agregado correctamente con su id [${id}]`)
                } else {
                    productExistente.stock += stock;
                    console.log(`[OK] -> El producto [${title}] se agrego [${stock}] a su stock con un total de [${productExistente.stock}]`)
                }
                
            } else {
                const productExistente = this.getProductByTitle(title);
                if(productExistente) {
                    productExistente.stock += stock;
                    console.log(`[OK] -> El producto [${title}] agregado correctamente por titulo segun la id [${productExistente.id}]`)
                } else {
                    const ultimoId = this.getLastIdAutoIncremental ();
                    const nuevoProducto = new Product (title, description, price, thumbnail, ultimoId, stock)
                    this.products.push(nuevoProducto);
                    this.setLastIdAutoIncremental (ultimoId);
                    console.log(`[OK] -> El producto [${title}] agregado correctamente sin antecedente con el id [${nuevoProducto.id}]`)
                }
            }
       } else {
           console.log(`[ERROR] -> El producto [${title}] no posee todos los campos llenos. No se pudo agregar a la lista`)
       }
    }

    //Muestra los productos guardados en el array de ProductManager
    getProducts () {
        for (const product of this.products) {
            this.mostrarUnProducto (product)
        }
    }

    //Busca y obtiene el producto dentro del array products de ProductManager segun el id ingresado por parametro 
    getProductById (id) {
        const productEncontrado = this.products.find(product => product.id === id);
        
        if(!productEncontrado) {
            return "Not found";
        }

        return productEncontrado;
    }

    //Busca y obtiene el producto dentro del array products de ProductManager segun el id ingresado por parametro 
    getProductByTitle (title) {
        const productEncontrado = this.searchTitleProduct (title)
    
        return productEncontrado;
    }

    //Metodo para encontrar si el id existe
    searchIdProduct (id) {
        const productExistente = this.products.find(product => product.id === id);
        console.log(this.products.find(product => product.id === id))
        console.log(`SearchIdProduct encontro [${productExistente}]`);

        return productExistente;
    }

    //Metodo para encontrar si el id existe
    searchTitleProduct (title) {
        const productExistente = this.products.find(product => product.title === title);
    
        return productExistente;
    }

    //Metodo para mostrar un producto
    mostrarUnProducto (product) {
        if(!product) {
            console.log("[ERROR] -> No hay ningun producto para mostrar")
        } else {
            console.log(`----------\nID: ${product.id}\nNOMBRE: ${product.title}\nDESCRIPCION: ${product.description} \nPRECIO: $ ${product.price} \nIMAGEN: ${product.thumbnail}\nSTOCK: ${product.stock}\n----------\n`);
        }
    }

    setLastIdAutoIncremental (id) {
        console.log(this.idAutoIncremental)
        if (id >= this.idAutoIncremental) {
            this.idAutoIncremental = id;
        }
        console.log(this.idAutoIncremental)
    }

    getLastIdAutoIncremental () {
        return this.idAutoIncremental + 1;
    }
}