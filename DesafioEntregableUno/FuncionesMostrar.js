export function mostrarListaDeProductos (lista) {
    for (const product of lista) {
        console.log(`----------\nID: ${product.id}\nNOMBRE: ${product.title}\nDESCRIPCION: ${product.description} \nPRECIO: $ ${product.price} \nIMAGEN: ${product.thumbnail}\nSTOCK: ${product.stock}\n----------\n`);
    }
}