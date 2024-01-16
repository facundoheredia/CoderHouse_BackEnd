//  ---- [IMPORTACIONES] ----
import { Router } from "express";
import {usuarioModel} from "../models/users.models.js";
import passport from "passport";
import { carritoModel } from "../models/carts.models.js";
import { login, logOut } from "../controller/session.controller.js";
import { ticketModel } from "../models/tickets.models.js";
import { productoModel } from "../models/products.models.js";

const viewsRouter = Router();

viewsRouter.get("/signUp", async (req,res) => {
    res.render("signUp",{
        title:"Regristrarse",
        js:"ingresar.js",
        css:"body.css"
    });
});

viewsRouter.post("/signUp", async (req,res) => {
    const {nombre, apellido, edad, email, contrasenia, contraseniaConfirmacion} = req.body;
    const errores = [];
    
    if(contrasenia != contraseniaConfirmacion) {
        errores.push({mensaje:"Las contraseñas no coinciden"})
    } else {
        if(contrasenia.length < 6) {
            errores.push({mensaje:"La contraseña debara tener 6 o mas caracteres"})
        } else {
            const emailRegistrado = await usuarioModel.findOne({email: email});

            if(emailRegistrado) {
                errores.push({mensaje:"El email ya se encuentra registrado"})
            } else {
                const nuevoUsuario = await usuarioModel.create({nombre, apellido, edad, email, contrasenia});
                nuevoUsuario.save();
                res.redirect("/views/login");
            }
        }
    }

    if(errores.length > 0) {
        res.render("signUp", {
            errores: errores,
            title:"Regristrarse",
            js:"ingresar.js",
            css:"body.css"
        })
    }
});

viewsRouter.get("/login", async (req,res) => {
    res.render("login",{
        title:"Ingresar",
        js:"ingresar.js",
        css:"body.css"
    });
});

viewsRouter.post("/login", passport.authenticate("login",{successRedirect:"./home",failureRedirect:"./login"}), login);

viewsRouter.get("/logout", async (req,res) => {
    
    const usuario = await usuarioModel.findOne({email:req.user.email})
    usuario.ultimaConexion = Date.now()
    await usuarioModel.findByIdAndUpdate(usuario._id,{usuario})
    
    res.clearCookie("jwtCookie");

    res.render("home",{
        title:"Home",
        js:"script.js",
        css:"body.css",
        usuario: false
    });
});

viewsRouter.get("/home", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("home",{
            title:"Home",
            js:"script.js",
            css:"body.css",
            usuario: usuarioLogeado,
            admin: esAdmin
        });
    } else {
        res.render("home",{
            title:"Home",
            js:"script.js",
            css:"body.css",
            usuario: false
        });
    }
});

viewsRouter.get("/productos", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("productos",{
            title:"Productos",
            js:"productos.js",
            css:"body.css",
            usuario: usuarioLogeado,
            admin: esAdmin
        });
    } else {
        res.redirect("login")
    }
});

viewsRouter.get("/carritos", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;
        const arrayCarritos = await carritoModel.find();


        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("carritos",{
            title:"Carritos",
            js:"carritos.js",
            css:"body.css",
            usuario: usuarioLogeado,
            carritos: arrayCarritos,
            admin: esAdmin
        })
    } else {
        res.redirect("login")
    }
});

viewsRouter.get("/carritos/:cid", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;
        let botonComprar = false;
        const carrito = await carritoModel.findById(usuarioLogeado.cart.toString());
        const arrayProductos = carrito.productos;
        const productosEnCarrito =[];
        let totalCompra = 0;
        arrayProductos.forEach(producto => productosEnCarrito.push({titulo: producto.idProducto.titulo, 
                                                                    precio: producto.idProducto.precio,
                                                                    codigo: producto.idProducto.codigo,
                                                                    cantidad:producto.cantidad}))
        
        if(productosEnCarrito.length != 0) {
            for(let i = 0; i < productosEnCarrito.length; i++) {
                totalCompra += productosEnCarrito[i].cantidad*productosEnCarrito[i].precio;
            }
            botonComprar = true;
        }

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("carritoDetalle",{
            title:"Detalle del carrito",
            js:"../../js/carritoDetalle.js",
            css:"../../css/body.css",
            usuario: usuarioLogeado,
            admin: esAdmin,
            productos: productosEnCarrito,
            totalCompra: totalCompra,
            botonComprar: botonComprar
        });
    } else {
        res.redirect("login")
    }
});

viewsRouter.get("/carritos/:cid/compra", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        const {cid} = req.params;
        const emailComprador = usuarioLogeado.email;

        const carrito = await carritoModel.findById(cid);

        if(carrito) {
            const productosVerificados = await verificarStock(carrito.productos);

            if(productosVerificados) {
                carrito.productos = [];
                await carritoModel.findByIdAndUpdate(cid,carrito);
                
                const montoTotalCompra = await calcularMontoCompra(productosVerificados,emailComprador);

                const nuevoTicket = await ticketModel.create({montoCompra: montoTotalCompra,productos: productosVerificados, comprador:emailComprador});

                const {montoCompra,comprador,fechaDeCompra,codigoCompra} = nuevoTicket;

                res.render("ticket",{
                    title:"Ticket compra",
                    js:"../../../js/ticket.js",
                    css:"../../../css/body.css",
                    usuario: usuarioLogeado,
                    admin: esAdmin,
                    montoCompra: montoCompra,
                    comprador:comprador,
                    fechaDeCompra: fechaDeCompra,
                    codigoCompra: codigoCompra
                });
            }
        } else {
            res.redirect("login")
        }
}});

viewsRouter.get("/documentacionapi", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }
    
        res.render("documentacionapi",{
            title:"Documentacion Api",
            js:"script.js",
            css:"body.css",
            usuario: usuarioLogeado,
            admin: esAdmin
        });
    } else {
        res.redirect("login")
    }
});

viewsRouter.get("/usuarios", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("usuarios",{
            title:"Usuarios",
            js:"usuarios.js",
            css:"body.css",
            usuario: usuarioLogeado,
            admin: esAdmin
        });
    } else {
        res.redirect("login")
    }
});


export default viewsRouter;


/*
viewsRouter.get("/logout", logOut, async (req,res) => {
    res.render("home",{
        title:"Home",
        js:"script.js",
        css:"body.css",
        usuario: false
    });
});

viewsRouter.get("/carritos/:cid/compra", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;

        const ticket = await ticketModel.findOne({email: usuarioLogeado.email});

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("carritoDetalle",{
            title:"Detalle del carrito",
            js:"../../js/carritoDetalle.js",
            css:"../../css/body.css",
            usuario: usuarioLogeado,
            admin: esAdmin,
            ticket: ticket
        });
    } else {
        res.redirect("login")
    }
});
*/


const verificarStock = async (productosEnCarrito) => {

    let productosVerificados = [];

    for (let productoEnCarrito of productosEnCarrito) {
        let productoEnDeposito = await productoModel.findById(productoEnCarrito.idProducto._id);

        if(productoEnDeposito) {
            if(productoEnDeposito.stock > 0 && productoEnCarrito.cantidad <= productoEnDeposito.stock) {
                productosVerificados.push(productoEnCarrito);
                productoEnDeposito.stock = productoEnDeposito.stock - productoEnCarrito.cantidad;

                await productoModel.findByIdAndUpdate(productoEnDeposito._id.toString(),productoEnDeposito);
            }
        }
    }

    return productosVerificados;
}

const calcularMontoCompra = async (productos,emailComprador) => {
    let totalCompra = 0;
      
    for (let producto of productos) {
        totalCompra += parseFloat(producto.idProducto.precio) * parseFloat(producto.cantidad);
    }

    totalCompra = await DescuentoUsuarioPremium (totalCompra,emailComprador);

    return totalCompra;
}

const DescuentoUsuarioPremium = async (totalCompra,emailComprador) => {

    const usuario = await usuarioModel.findOne({email: emailComprador})

    if(usuario) {
        if(usuario.rol = "premium") {
            totalCompra = totalCompra * 0.90;
        }
    }

    return totalCompra;
}