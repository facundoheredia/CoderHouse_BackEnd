//  ---- [IMPORTACIONES] ----
import "dotenv/config";
import mongoose from "mongoose"
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(`http://localhost:4000`);

await mongoose.connect(process.env.MONGO_URL);

describe("Test Usuarios sesion api/sesion", function() {
    let token = "";
    /*
    it("Ruta api/sesion/signUp con metodo POST", async () => {
        const nuevoUsuario = {
            nombre: "NombreTest4",
            apellido: "ApellidoTest4",
            edad: 55,
            email: "estaeslapruebatest4@testsesion.com",
            contrasenia: "testsesion4"
        }

        const {_body,statusCode} = await requester.post("/api/sesion/signUp").send(nuevoUsuario);
        console.log(_body)
        //expect(_body.payload).to.be.ok;
        expect(statusCode).to.be.equal(200);
    })
    */
    it("Ruta api/sesion/login con metodo POST", async () => {
        const usuario = {
            email: "admin@admin.com",
            contrasenia: "admin777"
        }

        const result = await requester.post("/api/sesion/login").send(usuario);
        const tokenResult = result.body.token;
        
        expect(tokenResult).to.be.ok;

        token = tokenResult;
        expect(token).to.be.ok;
    })

    it("Ruta api/sesion/current con metodo GET", async () => {
        const {_body} = await requester.get("/api/sesion/current").set("Authorization",[`${token}`]);
        expect(_body.email).to.be.equal("admin@admin.com");
    })
})