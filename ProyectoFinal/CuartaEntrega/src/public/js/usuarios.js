import { socketClienteCargarUsuarios } from "./clientSocket.js";
import { eventoBotonSubmitModificarUsuario, eventoBotonSubmitEliminarUsuario } from "./eventos.js";

socketClienteCargarUsuarios();
eventoBotonSubmitModificarUsuario();
eventoBotonSubmitEliminarUsuario();