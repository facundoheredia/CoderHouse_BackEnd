const socketCliente = io();
const eliminateProductForm = document.getElementById("eliminateProductForm");
const inputIdProducto = document.getElementById("idProducto");

eliminateProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idProducto = inputIdProducto.value;
    socketCliente.emit("eliminarProducto",idProducto);
    
    e.target.reset();
})