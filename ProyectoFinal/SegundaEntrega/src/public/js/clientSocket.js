const socketCliente = io();

socketCliente.on("connection",async (socket) => {
    socket.on("productos", async productos => {
        actualizarLista (productos);
        agregarProductoEnCarrito (productos);
    })

    socket.emit("nuevoProducto",nuevoProducto);
})