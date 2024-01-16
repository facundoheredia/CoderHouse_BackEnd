import { socketClienteCargarCarritos } from "./clientSocket.js";
import { eventoBotonSubmitAgregarProductoAlCarrito,eventoBotonSubmitEliminarProductoDeCarrito } from "./eventos.js";

socketClienteCargarCarritos();
eventoBotonSubmitAgregarProductoAlCarrito();
eventoBotonSubmitEliminarProductoDeCarrito();