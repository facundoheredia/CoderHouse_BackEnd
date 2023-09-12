const socketCliente = io();

const crearCarritoForm = document.getElementById("crearCarritoForm");
const agregarProductoEnCarritoForm = document.getElementById("agregarProductoEnCarritoForm");
const eliminarProductoDeCarritoForm = document.getElementById("eliminarProductoDeCarritoForm");

socketCliente.on("carritos",async (carritosActualizados) => {
    actualizarLista (carritosActualizados);
    verProductosEnCarrito (carritosActualizados);
});

crearCarritoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    socketCliente.emit("nuevoCarrito");

    e.target.reset();
})

agregarProductoEnCarritoForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProductoEnCarrito = Object.fromEntries(formData);

    socketCliente.emit("nuevoProductoEnCarrito",nuevoProductoEnCarrito);

    e.target.reset();
})

eliminarProductoDeCarritoForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const eliminarProductoDeCarrito = Object.fromEntries(formData);

    socketCliente.emit("eliminarProductoDeCarrito",eliminarProductoDeCarrito);

    e.target.reset();
})


function actualizarLista (carritosActualizados) {
    const bodyCarritos = document.getElementById("tablaCarritos");
    let listaDeCarritos = " ";

    carritosActualizados.forEach(carrito => {

        listaDeCarritos +=
        `<div class="col pb-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body p-2">
                    <div class="badge text-bg-success d-flex flex-column justify-content-center align-items-center p-2"><span class="material-symbols-outlined fs-3">deployed_code</span></div>
                </div>
                <div class="card-body">
                    <p class="card-text ps-2 textoProducto fw-medium">ID: ${carrito._id}</p>
                </div>
                <ul class="ps-2 list-group textoProducto">
                    <li class="list-group-item bg-transparent">Cantidad total de productos: ${cantidadTotalProductos(carrito.productos)}</li>
                    <li class="list-group-item bg-transparent">Total monto carrito: $ A implementar</li>
                </ul>
                <div class="card-body d-flex justify-content-center align-items-center pt-2 pb-2">
                    <button type="button" class="btn btn-success" id="botonDetallesCarrito-${carrito._id}"}>
                        <a href="http://localhost:4000/views/${carrito._id}"><p class="card-text ps-2 pe-2">Detalles del carrito</p></a>
                    </button>
                </div>
            </div>
        </div>`
    });

    bodyCarritos.innerHTML = listaDeCarritos;
}

function cantidadTotalProductos (productosEnCarrito) {
    
    let cantidadTotal = 0;

    productosEnCarrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
    })

    return cantidadTotal;
}

function verProductosEnCarrito (carritosActualizados) {
    carritosActualizados.forEach(carrito => {
        let botonVerDetallesProductosEnCarrito = document.getElementById(`botonDetallesCarrito-${carrito._id}`);

        botonVerDetallesProductosEnCarrito.addEventListener("click", function() {
            
            socketCliente.emit("verDetalleCarrito",carrito);
        })
    })    
}