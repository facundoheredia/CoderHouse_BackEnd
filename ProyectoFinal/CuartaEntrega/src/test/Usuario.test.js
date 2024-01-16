//  ---- [IMPORTACIONES] ----
import "dotenv/config";
import mongoose from "mongoose"
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(`http://localhost:4000`);

await mongoose.connect(process.env.MONGO_URL)


describe("Test CRUD de Ususarios en la ruta api/usuarios", function () {

    it("Obtener codigo 200 al consultar usuarios mediante metodo GET", async() => {
        const {statusCode} = await requester.get("/api/usuarios");
        expect(statusCode).to.be.equal(200);
    })

    it("Obtener respuesta [OK] al consultar usuarios mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/usuarios");
        expect(_body.respuesta).to.be.equal("[OK]");
    })

    it("Obtener datos como array al consultar usuarios mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/usuarios");
        expect(Array.isArray(_body.mensaje)).to.be.ok;
    })

    it("Obtener codigo 200 al consultar usuario mediante metodo GET", async() => {
        const {statusCode} = await requester.get("/api/usuarios/6536f980c7569da15c14b791");
        expect(statusCode).to.be.equal(200);
    })

    it("Obtener respuesta [OK] al consultar usuario mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/usuarios/6536f980c7569da15c14b791");
        expect(_body.respuesta).to.be.equal("[OK]");
    })

    it("Obtener el dato de ID al consultar usuario existente mediante metodo GET", async() => {
        const {_body} = await requester.get("/api/usuarios/6536f980c7569da15c14b791");
        expect(_body.mensaje).to.have.property("_id");
    })

    it("Obtener codigo 200 al modificar datos del usuario mediante metodo PUT", async() => {
        const usuarioModificado = {
            nombre:"prueba2",
            apellido: "prueba2",
            edad: 55,
            email: "prueba2@prueba2.com",
            contrasenia: "prueba2"
        }

        const {statusCode} = await requester.put("/api/usuarios/6572378937dc20ef0ae44ac5").send(usuarioModificado);
        expect(statusCode).to.be.equal(200);
    })

    it("Obtener codigo 200 al eliminar el usuario mediante metodo DELETE", async() => {

        const {statusCode} = await requester.delete("/api/usuarios/id"); //Colocar ID del usuario creado como prueba en sesion
        expect(statusCode).to.be.equal(200);
    })
})