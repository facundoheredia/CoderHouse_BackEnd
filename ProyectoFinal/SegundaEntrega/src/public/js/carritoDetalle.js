console.log("hola detalle del carrito")

const socketCliente = io();

socketCliente.on("carritoDetalle",async (carrito) => {
    console.log("hola")
    console.log(carrito)
    //actualizarDatosDeCarritoDetalles (carrito);
});

/*
function actualizarDatosDeCarritoDetalles (carrito) {
    const bodyCarrito = document.getElementById("datosCarrito");

    bodyCarrito.innerHTML =
    `<div class="col pb-4">
    <p>${carrito._id}</p>
    </div>`;
}*/