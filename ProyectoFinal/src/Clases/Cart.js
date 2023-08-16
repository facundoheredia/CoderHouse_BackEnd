//CLASE PRODUCT
export class Cart {
    constructor () {
        this.products = [],
        this.id = Cart.idIncremental();
    }

    //METODOS
    //Se encarga de agregar la key ID si es que no existe y luego suma 1 por cada nuevo producto generado.
    static idIncremental() {
        if(this.id) {
            this.id++;
        } else {
            this.id = 1;
        }

        return this.id;
    }
}