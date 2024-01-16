import { actualizarListaUsuarios, actualizarListaProductos, agregarProductoEnCarrito, actualizarListaCarritos, verProductosEnCarrito,actualizarListaDeProductosEnCarrito } from "./funcionesHtml.js";

const socketCliente = io();

// USUARIOS
const socketClienteCargarUsuarios = () => {
    socketCliente.on("usuarios", async usuarios => {
        actualizarListaUsuarios (usuarios);
    })
}

const socketClienteModificarusuario = (usuarioModificado) => {
    socketCliente.emit("modificarUsuario",usuarioModificado);
}

const socketClienteEliminarUsuario = (idUsuario) => {
    socketCliente.emit("eliminarUsuario",idUsuario);
}

// PRODUCTOS
const socketClienteCargarProductos = () => {
    socketCliente.on("productos", async productos => {
        actualizarListaProductos (productos);
    })
}

const socketClienteModificarProducto = (productoModificado) => {
    socketCliente.emit("modificarProducto",productoModificado);
}

const socketClienteAgregarProducto = () => {
    socketCliente.on("productos", async productos => {
        agregarProductoEnCarrito (productos);
    })
}

const socketClienteNuevoProducto = (nuevoProducto) => {
    socketCliente.emit("nuevoProducto",nuevoProducto);
}

const socketClienteAgregarProductoAlCarrito = (producto) => {
    socketCliente.emit("agregarProductoAlCarrito",producto);
}

const socketClienteEliminarProducto = (idProducto) => {
    socketCliente.emit("eliminarProducto",idProducto);
}

const socketClienteModificarEstadoDelProducto = (productoEstadoModificado) => {
    socketCliente.emit("modificarEstadoProducto",productoEstadoModificado);
}

// CARRITO
const socketClienteCargarCarritos = () => {
    socketCliente.on("carritos",async carritosActualizados => {
        actualizarListaCarritos (carritosActualizados);
        verProductosEnCarrito(carritosActualizados);
    });
}

const socketClienteNuevoProductoEnCarrito = (nuevoProductoEnCarrito) => {
    socketCliente.emit("nuevoProductoEnCarrito",nuevoProductoEnCarrito);
}

const socketClienteEliminarProductoDelCarrito = (eliminarProductoDeCarrito) => {
    socketCliente.emit("eliminarProductoDeCarrito",eliminarProductoDeCarrito);
}

const socketClienteVerProductosEnCarrito = (carrito) => {
    socketCliente.emit("verDetalleCarrito",carrito);
} 

// DETALLES CARRITO
const socketClienteMostrarProductosEnCarrito = () => {
    console.log("hola socket recibiendo carrito");
    socketCliente.on("carritoDetalle", async productos => {
        actualizarListaDeProductosEnCarrito (productos);
        console.log("el server socket recibe este carrito");
        console.log(carrito);
    })
}

export { socketClienteModificarusuario, socketClienteEliminarUsuario, socketClienteCargarUsuarios, socketClienteCargarProductos, socketClienteModificarProducto, socketClienteAgregarProductoAlCarrito, socketClienteNuevoProducto, socketClienteAgregarProducto, socketClienteEliminarProducto, socketClienteModificarEstadoDelProducto, socketClienteCargarCarritos,socketClienteNuevoProductoEnCarrito,socketClienteEliminarProductoDelCarrito,socketClienteVerProductosEnCarrito,socketClienteMostrarProductosEnCarrito };