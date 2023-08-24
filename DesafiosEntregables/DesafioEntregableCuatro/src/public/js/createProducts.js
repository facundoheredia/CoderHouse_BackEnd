const socketCliente = io();

console.log("hola estoy en js create products");

const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProducto = Object.fromEntries(formData);
    console.log(nuevoProducto)
    socketCliente.emit("nuevoProducto",nuevoProducto);
    console.log(`[ESTE PRODUCTO SE ENVIO AL SERVER ] ${nuevoProducto.title}`)
    e.target.reset();
})