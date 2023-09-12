const socketCliente = io();

const createProductForm = document.getElementById("createProductForm");
const eliminateProductForm = document.getElementById("eliminateProductForm");
const modificarEstadoProductoForm = document.getElementById("modificarEstadoProductoForm");
const inputIdProducto = document.getElementById("idProducto");


socketCliente.on("productos",async (productosActualizados) => {
    actualizarLista (productosActualizados);
    agregarProductoEnCarrito (productosActualizados);
});

createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProducto = Object.fromEntries(formData);

    socketCliente.emit("nuevoProducto",nuevoProducto);

    e.target.reset();
})

eliminateProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idProducto = inputIdProducto.value;
    socketCliente.emit("eliminarProducto",idProducto);
    
    e.target.reset();
})

modificarEstadoProductoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productoEstadoModificado = Object.fromEntries(formData);

    socketCliente.emit("modificarEstadoProducto",productoEstadoModificado);
    
    e.target.reset();
})

function actualizarLista (productosActualizados) {
    const bodyProductos = document.getElementById("tablaProductos");
    let listaDeProductos = " ";

    productosActualizados.forEach(producto => {
        let colorFondoTitulo;
        let colorFondoTarjeta;
        let colorBoton;

        if(producto.estado) {
            colorFondoTitulo = "text-bg-success";
            colorFondoTarjeta = "bg-body-secondary";
            colorBoton = "btn-success";

        } else {
            colorFondoTitulo = "text-bg-danger";
            colorFondoTarjeta = "bg-danger-subtle";
            colorBoton = "btn-danger";
        }

        listaDeProductos +=
        `<div class="col pb-4">
            <div class="card ${colorFondoTarjeta}" style="width: 18rem;">
                <div class="card-body p-2">
                    
                    <div class="badge ${colorFondoTitulo} text-bg-success d-flex flex-column justify-content-center align-items-center p-2"><span class="material-symbols-outlined fs-3">deployed_code</span><h5 class="card-title text-center text-uppercase">${producto.titulo}</h5></div>
                </div>
                <div class="card-body">
                    <p class="card-text ps-2 textoProducto">Descripcion: ${producto.descripcion}</p>
                </div>
                <ul class="ps-2 list-group textoProducto">
                    <li class="list-group-item bg-transparent">Precio: $ ${producto.precio}</li>
                    <li class="list-group-item bg-transparent">Categoria: ${producto.categoria}</li>
                    <li class="list-group-item bg-transparent">Codigo: ${producto.codigo}</li>
                    <li class="list-group-item bg-transparent">Cantidad: ${producto.stock}</li>
                    <li class="list-group-item bg-transparent fw-medium">ID: ${producto._id}</li>
                </ul>
                <div class="d-flex justify-content-center align-items-center pt-2 pb-2">
                    <button type="button" class="btn ${colorBoton}" id="botonDetallesProducto-${producto._id}"}>
                        <p class="ps-2 pe-2">Agregar al carrito</p>
                    </button>
                </div>
            </div>
        </div>`
    });

    bodyProductos.innerHTML = listaDeProductos;
}

function agregarProductoEnCarrito (productosActualizados) {
    productosActualizados.forEach(producto => {
        let botonAgregarProductoAlCarrito = document.getElementById(`botonDetallesProducto-${producto._id}`);

        botonAgregarProductoAlCarrito.addEventListener("click", function() {
            if(producto.estado) {
                socketCliente.emit("agregarProductoAlCarrito",producto);
                console.log("Producto agregado al carrito");
            } else {
                console.log("El producto no se encuentra activado");
            }
        })
    })    
}