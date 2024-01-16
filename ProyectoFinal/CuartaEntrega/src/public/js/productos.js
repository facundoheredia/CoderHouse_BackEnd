import { socketClienteCargarProductos, socketClienteAgregarProducto } from "./clientSocket.js";
import { eventoBotonSubmitCrearProducto,eventoBotonSubmitModificarProducto,eventoBotonSubmitEliminarProducto, eventoBotonSubmitModificarEstadoProducto } from "./eventos.js";

socketClienteCargarProductos();
socketClienteAgregarProducto();
eventoBotonSubmitCrearProducto();
eventoBotonSubmitModificarProducto();
eventoBotonSubmitEliminarProducto();
eventoBotonSubmitModificarEstadoProducto();