const socketCliente = io();
const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProducto = Object.fromEntries(formData);

    socketCliente.emit("nuevoProducto",nuevoProducto);
    console.log(`[PRODUCTO CREADO FORMULARIO] -> ${nuevoProducto.titulo}`);

    e.target.reset();
})