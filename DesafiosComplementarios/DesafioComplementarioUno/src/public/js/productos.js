const socketCliente = io();

const createProductForm = document.getElementById("createProductForm");
const eliminateProductForm = document.getElementById("eliminateProductForm");
const inputIdProducto = document.getElementById("idProducto");

socketCliente.on("productos",async (productosActualizados) => {
    actualizarLista (productosActualizados);
});

createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProducto = Object.fromEntries(formData);

    socketCliente.emit("nuevoProducto",nuevoProducto);
    console.log(`[PRODUCTO CREADO FORMULARIO] -> ${nuevoProducto.titulo}`);

    e.target.reset();
})

eliminateProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idProducto = inputIdProducto.value;
    socketCliente.emit("eliminarProducto",idProducto);
    
    e.target.reset();
})

function actualizarLista (productosActualizados) {
    const bodyProductos = document.getElementById("tablaProductos");
    let listaDeProductos = " ";

    productosActualizados.forEach(producto => {
        let colorFondo;
        let colorBorde;

        if(producto.estado) {
            colorFondo = "text-bg-success";
        } else {
            colorFondo = "text-bg-danger";
        }

        listaDeProductos +=
        `<div class="col pb-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body p-2">
                    <div class="badge ${colorFondo} text-bg-success d-flex justify-content-center align-items-center p-2"><h5 class="card-title text-center text-uppercase">${producto.titulo}</h5></div>
                </div>
                <div class="card-body">
                    <p class="card-text ps-2 textoProducto">Descripcion: ${producto.descripcion}</p>
                </div>
                <ul class="ps-2 list-group list-group-flush textoProducto">
                    <li class="list-group-item">Precio: $ ${producto.precio}</li>
                    <li class="list-group-item">Categoria: ${producto.categoria}</li>
                    <li class="list-group-item">Codigo: ${producto.codigo}</li>
                    <li class="list-group-item">Cantidad: ${producto.stock}</li>
                    <li class="list-group-item">ID: ${producto._id}</li>
                </ul>
            </div>
        </div>`
    });

    bodyProductos.innerHTML = listaDeProductos;
}