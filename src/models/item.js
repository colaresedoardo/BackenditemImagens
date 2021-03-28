import mongoose from 'mongoose'
const itemSchema = new mongoose.Schema({
    titulo:String,
    linkImagem:String,
    linkResource:String,
    subitem: {
        type: Boolean,
        default: false
    },
    categoria: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    imagem:{type: mongoose.Schema.Types.ObjectId, ref:'Imagem', required:true},
    item:[{type: mongoose.Schema.Types.ObjectId, ref:'Item', required:false}]
    
})
// itemSchema.pre("remove", function () {
 
//     return promisify(fs.unlink)(
//       path.resolve(__dirname, "..", "..", "tmp", "uploads", this.filename)
//     );
//   }
// );


//Criando um model pessoa
const Item = mongoose.model("Item",itemSchema)
export default Item