import { productoModel } from "../models/products.models.js";
import { ticketModel } from "../models/tickets.models.js";

export const getTicket = async (req,res) => {
    const {tid} = req.params;

    try {
        const ticketEncontrado = await ticketModel.findById(tid);
        let mensaje = "";

        if(ticketEncontrado) {
            mensaje +=`- Su numero de ticket es: [${ticketEncontrado.codigoCompra}]\n
                        - Recibira un correo con la compra al correo [${ticketEncontrado.comprador}]\n
                        - Fecha de la compra realizada el [${ticketEncontrado.fechaDeCompra}]\n
                        - Los productos comprados fueron los sigientes:\n`;
        
            for (let productosEnTicket of ticketEncontrado.productos) {
                let productoEncontrado = await productoModel.findById(productosEnTicket.idProducto);
        
                if(productoEncontrado) {
                    mensaje += `- Nombre: [${productoEncontrado.titulo}]\n
                                - Precio unitario: [${productoEncontrado.precio}]\n
                                - Cantidad: [${productosEnTicket.cantidad}]\n`
                }
            }
            mensaje += `- El valor de la compra es de [$ ${ticketEncontrado.montoCompra}]\n`

            res.status(200).send(mensaje);

        } else {
            res.status(404).send({error: `Error no se encontro el ticket ${error}`});
        }
    } catch(error) {
        res.status(500).send({error: `Error al consultar ticket ${error}`});
    }
}