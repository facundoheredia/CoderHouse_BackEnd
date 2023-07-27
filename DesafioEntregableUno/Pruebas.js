import { ProductManager } from "./ProductManager.js";
import { listaDeProductos } from "./ProductsList.js";
import { mostrarListaDeProductos } from "./FuncionesMostrar.js";

//NUEVO PRODUCT MANAGER
const productManager = new ProductManager ();

//LECTURA DE LISTA DE PRODUCTOS DE PRUEBA
console.log("\n[---------------------------------]\n[LISTADO DE PRODUCTOS PARA AGREGAR]\n[---------------------------------]\n");
mostrarListaDeProductos(listaDeProductos)

//VERIFICACION DE LISTA DE PRODUCTOS DE PRUEBA PARA AGREGAR AL PRODUCT MANAGER
console.log("\n[--------------------------------------------------------------------]\n[VERIFICANDO DATOS DE LISTA DE PRODUCTOS A AGREGAR AL PRODUCT MANAGER]\n[--------------------------------------------------------------------]\n");
listaDeProductos.forEach(producto => {
    productManager.addProduct(producto);
})

//VERIFICACION DE LISTA DE PRODUCTOS DE PRUEBA PARA AGREGAR AL PRODUCT MANAGER
const productoIndividual =     
{
    title: "productoPrueba", 
    description: "este es el producto de prueba", 
    price: 99999, 
    thumbnail: "esta es su imagen", 
    id: undefined, 
    stock: 1,
}
productManager.addProduct(productoIndividual);

//PRODUCTOS AGREGADOS AL PRODUCT MANAGER
console.log("\n[----------------------------------------------]\n[LISTA DE PRODUCTOS AGREGADOS A PRODUCT MANAGER]\n[----------------------------------------------]\n");
productManager.getProducts();

//PRUEBA DE BUSQUEDA DE UN PRODUCTO POR ID
console.log("\n[------------------------------]\n[SE BUSCA EL SIGUIENTE PRODUCTO]\n[------------------------------]\n");
const productoBuscado1 = productManager.getProductById(1);
productManager.mostrarUnProducto(productoBuscado1);
console.log("\n[------------------------------]\n[SE BUSCA EL SIGUIENTE PRODUCTO]\n[------------------------------]\n");
const productoBuscado2 = productManager.getProductById(7);
productManager.mostrarUnProducto(productoBuscado2);