/*import multer from "multer";
import { __dirname } from "../Path.js";
import path from "path";
//Subir documento
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.resolve(__dirname,`./public/img`))
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

export default upload;*/