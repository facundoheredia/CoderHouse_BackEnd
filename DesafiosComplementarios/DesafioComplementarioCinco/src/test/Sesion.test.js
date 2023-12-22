import "dotenv/config";
import mongoose from "mongoose"
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(`http://localhost:4000`);

await mongoose.connect(process.env.MONGO_URL);

describe("Test Usuarios sesion api/sesion"), function() {
    let cookie = {};

    it("Ruta api/sesion/signUp con metodo POST", async () => {
        const nuevoUsuario = {
            nombre: "NombreTest",
            apellido: "ApellidoTest",
            edad: 55,
            email: "estaeslapruebatest1@testsesion.com",
            contrasenia: "testsesionnuevousuario"
        }

        const {_body} = await requester.post("api/sesion/signUp").send(nuevoUsuario);

        expect(_body.payload).to.be.ok;
    })

    it("Ruta api/sesion/login con metodo POST", async () => {
        const usuario = {
            email: "estaeslapruebatest@testsesion.com",
            contrasenia: "testsesionnuevousuario"
        }

        const result = await requester.post("api/sesion/login").send(usuario);
        const cookieResult = result.headers["set-cookie"][0];

        expect(cookieResult).to.be.ok;

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }

        expect(cookie.name).to.be.ok.and.equal("coderCookie");
        expect(cookie.value).to.be.ok;
    })

    it("Ruta api/sesion/current con metodo GET", async () => {

        const {_body} = await requester.post("api/sesion/current").set("Cookie",[`${cookie.name} = ${cookie.value}`])

        expect(_body.payload.email).to.be.equal("estaeslapruebatest@testsesion.com");
    })
}