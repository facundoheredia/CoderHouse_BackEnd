//CLASE PRODUCT
export class Product {
    constructor (title, description, price, thumbnail, code, stock, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = true;
        this.category = category;
        this.id = Product.idIncremental();
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