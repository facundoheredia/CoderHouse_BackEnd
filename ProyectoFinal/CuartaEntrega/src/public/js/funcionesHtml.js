import { eventoBotonAgregarProductoAlCarrito,eventoBotonVerProductosEnCarrito } from "./eventos.js";

function actualizarListaUsuarios (usuariosActualizados) {
    const bodyUsuarios = document.getElementById("tablaUsuarios");
    let listaDeUsuarios = " ";

    usuariosActualizados.forEach(usuario => {
        let colorFondoTitulo;
        let colorFondoTarjeta;

        if(usuario.rol == "admin") {
            colorFondoTitulo = "text-bg-info";
            colorFondoTarjeta = "bg-info-subtle";
        } else {
            if(usuario.rol == "premium") {
                colorFondoTitulo = "text-bg-warning";
                colorFondoTarjeta = "bg-warning-subtle";
            } else {
                colorFondoTitulo = "text-bg-primary";
                colorFondoTarjeta = "bg-primary-subtle";
            }
        }

        listaDeUsuarios +=
        `<div class="col pb-4">
            <div class="card ${colorFondoTarjeta}" style="width: 18rem;">
                <div class="card-body p-2">
                    <div class="badge ${colorFondoTitulo} d-flex flex-column justify-content-center align-items-center p-2"><span class="material-symbols-outlined fs-3">person</span><h5 class="card-title text-center text-uppercase">${usuario.rol}</h5></div>
                </div>
                <ul class="ps-2 list-group textoProducto">
                    <li class="list-group-item bg-transparent">Nombre: ${usuario.nombre}</li>
                    <li class="list-group-item bg-transparent">Apellido: ${usuario.apellido}</li>
                    <li class="list-group-item bg-transparent">Edad: ${usuario.edad}</li>
                    <li class="list-group-item bg-transparent">Email: ${usuario.email}</li>
                    <li class="list-group-item bg-transparent">Ultima conexion: ${usuario.ultimaConexion}</li>
                    <li class="list-group-item bg-transparent fw-medium">ID: ${usuario._id}</li>
                </ul>
            </div>
        </div>`
    });

    bodyUsuarios.innerHTML = listaDeUsuarios;
}

function actualizarListaProductos (productosActualizados) {
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
        eventoBotonAgregarProductoAlCarrito(producto);
    })    
}

function actualizarListaCarritos (carritosActualizados) {
    const bodyCarritos = document.getElementById("tablaCarritos");
    let listaDeCarritos = " ";

    carritosActualizados.forEach(carrito => {

        listaDeCarritos +=
        `<div class="col pb-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body p-2">
                    <div class="badge text-bg-success d-flex flex-column justify-content-center align-items-center p-2"><span class="material-symbols-outlined fs-3">shopping_cart</span></div>
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
                        <a href="http://localhost:4000/views/carritos/${carrito._id}" class="text-light text-decoration-none"><p class="card-text ps-2 pe-2">Detalles del carrito</p></a>
                    </button>
                </div>
            </div>
        </div>`
    });

    bodyCarritos.innerHTML = listaDeCarritos;
}

function cantidadTotalProductos (productosEnCarrito) {
    
    let cantidadTotal = 0;

    if(productosEnCarrito) {
        productosEnCarrito.forEach(producto => {
            cantidadTotal += producto.cantidad;
        })
    }

    return cantidadTotal;
}

function verProductosEnCarrito (carritosActualizados) {
    carritosActualizados.forEach(carrito => {
        eventoBotonVerProductosEnCarrito(carrito);
    })    
}

function actualizarListaDeProductosEnCarrito (productos) {
    const bodyCarrito = document.getElementById("listaProductosEnCarrito");
    let listaDeProductos = " ";

    productos.forEach(producto => {

        listaDeProductos +=
        `<li>${producto._id}</li>`
    });

    bodyCarrito.innerHTML = listaDeProductos;
}

export {actualizarListaUsuarios, actualizarListaProductos, agregarProductoEnCarrito, actualizarListaCarritos,verProductosEnCarrito,actualizarListaDeProductosEnCarrito}