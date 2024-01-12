import "dotenv/config";
import mongoose from "mongoose"
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(`http://localhost:4000`);

await mongoose.connect(process.env.MONGO_URL)


describe("Test para agregar cantidad de productos en la ruta api/carritos", function () {

    it("Agregar un producto en carrito mediante metodo POST", async() => {
        const cantidadProducto = {
            cantidad: 50
        }
        
        const {statusCode} = await requester.post("/api/carritos/6536f980c7569da15c14b792/productos/64f7bde2ef5cc2579a1f1766").send(cantidadProducto);

        expect(statusCode).to.be.equal(200);
    })
})