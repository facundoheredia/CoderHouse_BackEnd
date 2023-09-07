const socketCliente = io();

socketCliente.on("productos",async (productosActualizados) => {
    actualizarLista (productosActualizados);
});

function actualizarLista (productosActualizados) {
    const bodyProductos = document.getElementById("tablaProductos");
    let listaDeProductos = " ";

    productosActualizados.forEach(producto => {
        listaDeProductos +=
        `<tr>
        <td scope="row">${producto._id}</td>
        <td>${producto.titulo}</td>
        <td>${producto.descripcion}</td>
        <td>$ ${producto.precio}</td>
        <td>${producto.categoria}</td>
        <td>${producto.codigo}</td>
        <td>${producto.stock}</td>
        <td><div class="badge text-bg-success d-flex justify-content-center align-items-center"><p class="text-uppercase">${producto.estado}</p></div></td>
      </tr>`
    });

    bodyProductos.innerHTML = listaDeProductos;
}