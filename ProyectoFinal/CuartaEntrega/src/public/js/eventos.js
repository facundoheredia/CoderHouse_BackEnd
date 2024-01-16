import {socketClienteModificarusuario, 
        socketClienteEliminarUsuario, 
        socketClienteModificarProducto, 
        socketClienteEliminarProducto, 
        socketClienteAgregarProductoAlCarrito, 
        socketClienteNuevoProducto, 
        socketClienteModificarEstadoDelProducto, 
        socketClienteNuevoProductoEnCarrito,
        socketClienteEliminarProductoDelCarrito,
        socketClienteVerProductosEnCarrito } from "./clientSocket.js";

const eventoBotonSubmitModificarUsuario = () => {
    const modificarUsuarioForm = document.getElementById("modifyUserForm");

    modificarUsuarioForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const usuarioModificado = Object.fromEntries(formData);

        socketClienteModificarusuario(usuarioModificado);
        
        e.target.reset();
    })
}

const eventoBotonSubmitEliminarUsuario = () => {
    const eliminateUserForm = document.getElementById("eliminateUserForm");
    const inputIdUsuario = document.getElementById("idUser");

    eliminateUserForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const idUsuario = inputIdUsuario.value;
        socketClienteEliminarUsuario(idUsuario);
        
        e.target.reset();
    })
}

const eventoBotonAgregarProductoAlCarrito = (producto) => {
    let botonAgregarProductoAlCarrito = document.getElementById(`botonDetallesProducto-${producto._id}`);

    botonAgregarProductoAlCarrito.addEventListener("click", function() {
        if(producto.estado) {
            socketClienteAgregarProductoAlCarrito(producto);
            console.log("Producto agregado al carrito");
        } else {
            console.log("El producto no se encuentra activado");
        }
    })
}

const eventoBotonSubmitCrearProducto = () => {
    const createProductForm = document.getElementById("createProductForm");

    createProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const nuevoProducto = Object.fromEntries(formData);
    
        socketClienteNuevoProducto(nuevoProducto);
    
        e.target.reset();
    })
}

const eventoBotonSubmitModificarProducto = () => {
    const modificarProductoForm = document.getElementById("modifyProductForm");

    modificarProductoForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const productoModificado = Object.fromEntries(formData);
    
        socketClienteModificarProducto(productoModificado);
        
        e.target.reset();
    })
}

const eventoBotonSubmitEliminarProducto = () => {
    const eliminateProductForm = document.getElementById("eliminateProductForm");
    const inputIdProducto = document.getElementById("idProducto");

    eliminateProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const idProducto = inputIdProducto.value;

        socketClienteEliminarProducto(idProducto)
        
        e.target.reset();
    })
}

const eventoBotonSubmitModificarEstadoProducto = () => {
    const modificarEstadoProductoForm = document.getElementById("modificarEstadoProductoForm");

    modificarEstadoProductoForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const productoEstadoModificado = Object.fromEntries(formData);
    
        socketClienteModificarEstadoDelProducto(productoEstadoModificado);
        
        e.target.reset();
    })
}

const eventoBotonSubmitAgregarProductoAlCarrito = () => {
    const agregarProductoEnCarritoForm = document.getElementById("agregarProductoEnCarritoForm");
    
    agregarProductoEnCarritoForm.addEventListener("submit",(e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const nuevoProductoEnCarrito = Object.fromEntries(formData);
    
        socketClienteNuevoProductoEnCarrito(nuevoProductoEnCarrito);
    
        e.target.reset();
    })
}

const eventoBotonSubmitEliminarProductoDeCarrito = () => {
    const eliminarProductoDeCarritoForm = document.getElementById("eliminarProductoDeCarritoForm");
    
    eliminarProductoDeCarritoForm.addEventListener("submit",(e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const eliminarProductoDeCarrito = Object.fromEntries(formData);
    
        socketClienteEliminarProductoDelCarrito(eliminarProductoDeCarrito),
    
        e.target.reset();
    })
}

const eventoBotonVerProductosEnCarrito = (carrito) => {
    let botonVerDetallesProductosEnCarrito = document.getElementById(`botonDetallesCarrito-${carrito._id}`);

    botonVerDetallesProductosEnCarrito.addEventListener("click", function() {
        
        socketClienteVerProductosEnCarrito(carrito);
    })
}

const eventoBotonSubmitIngresar = () => {
    const ingresarForm = document.getElementById("loginForm");

    ingresarForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const cuentaIngresando = Object.fromEntries(formData);
    
    
        e.target.reset();
    })
}

const eventoBotonComprar = () => {
    
    const botonComprar = document.getElementById("botonComprar");

    botonComprar.addEventListener("submit", async(e) => {
        e.preventDefault();

        console.log("Se realizo la compra");
    })
}

export {eventoBotonSubmitModificarUsuario, 
        eventoBotonSubmitEliminarUsuario, 
        eventoBotonAgregarProductoAlCarrito, 
        eventoBotonSubmitCrearProducto, 
        eventoBotonSubmitModificarProducto, 
        eventoBotonSubmitEliminarProducto, 
        eventoBotonSubmitModificarEstadoProducto, 
        eventoBotonSubmitAgregarProductoAlCarrito, 
        eventoBotonSubmitEliminarProductoDeCarrito, 
        eventoBotonVerProductosEnCarrito, 
        eventoBotonSubmitIngresar,
        eventoBotonComprar};