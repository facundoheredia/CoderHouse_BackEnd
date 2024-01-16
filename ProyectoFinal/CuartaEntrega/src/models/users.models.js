import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { carritoModel } from "./carts.models.js";

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true,
        index: true
    },
    edad: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contrasenia: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        default: "user"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref:"carritos"
    },
    documentos: {
        type: [
            {
                nombre: {
                    type: String,
                    required: true
                },
                referencia: {
                    type: String,
                    required:true
                }
            }
        ],
        default: []
    },
    ultimaConexion: {
        type: Date,
        default: Date.now()
    }
}); 

usuarioSchema.plugin(paginate);

usuarioSchema.pre("save", async function(next) {
    try {
        const nuevoCarrito = await carritoModel.create({});
        this.cart = nuevoCarrito._id;
    } catch (error) {
        next(error)
    }
})

export const usuarioModel = model("usuarios",usuarioSchema);