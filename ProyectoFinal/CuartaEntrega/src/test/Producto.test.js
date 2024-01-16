//  ---- [IMPORTACIONES] ----
import "dotenv/config";
import mongoose from "mongoose"
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(`http://localhost:4000`);

await mongoose.connect(process.env.MONGO_URL)

describe("Test CRUD de Productos en la ruta api/productos", function () {
    
    it("Obtener codigo 200 al consultar productos mediante metodo GET", async() => {
        const {statusCode} = await requester.get("/api/productos");
        expect(statusCode).to.be.equal(200);
    })

    it("Obtener respuesta [OK] al consultar productos mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/productos");
        expect(_body.respuesta).to.be.equal("[OK]");
    })

    it("Obtener datos como array al consultar productos mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/productos");
        expect(Array.isArray(_body.mensaje.docs)).to.be.ok;
    })

    it("Obtener codigo 200 al consultar producto mediante metodo GET", async() => {
        const {statusCode} = await requester.get("/api/productos/64f7bde2ef5cc2579a1f1766");
        expect(statusCode).to.be.equal(200);
    })

    it("Obtener respuesta [OK] al consultar producto mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/productos/64f7bde2ef5cc2579a1f1766");
        expect(_body.respuesta).to.be.equal("[OK]");
    })

    it("Obtener el dato de ID al consultar producto existente mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/productos/64f7bde2ef5cc2579a1f1766");
        expect(_body.mensaje).to.have.property("_id");
    })

    // TEST COMENTADOS PARA IR PROBANDO INDIVIDUALMENTE SEGUN CREACION MODIFICACION Y ELIMINACION DE PRODUCTO
    
    /*
    it("Crear un producto mediante metodo POST", async() => {
        const nuevoProducto = {
            titulo: "Producto prueba",
            descripcion: "Este producto es de prueba",
            precio: 8888,
            codigo: "pruebaTest", 
            stock: 666, 
            categoria: "categoria prueba"
        }
        
        const {statusCode} = await requester.post("/api/productos").send(nuevoProducto);

        expect(statusCode).to.be.equal(201);
    })*/
    /*
    it("Modificar un producto mediante metodo PUT", async() => {
        const productoModificado = {
            titulo: "Producto prueba",
            descripcion: "Este producto es de prueba",
            precio: 8888,
            codigo: "pr11est", 
            stock: 666, 
            categoria: "categoria prueba"
        }
        
        const {statusCode} = await requester.put("/api/productos/64fbae6e654ab70bf76f7f61").send(productoModificado);
        expect(statusCode).to.be.equal(200);
    })*/

    /*
    it("Obtener codigo 200 al eliminar el producto mediante metodo DELETE", async() => {

        const {statusCode} = await requester.delete("/api/productos/64fbae6e654ab70bf76f7f61"); //Colocar ID del producto creado como prueba
        expect(statusCode).to.be.equal(200);
    })*/
})