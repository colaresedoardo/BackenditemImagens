import mongoose from 'mongoose'
const itemSchema = new mongoose.Schema({
    titulo:String,
    linkImagem:String,
    linkResource:String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    imagem:{type: mongoose.Schema.Types.ObjectId, ref:'Imagem', required:true},
    item:[{type: mongoose.Schema.Types.ObjectId, ref:'Item', required:false}]
    
})


//Criando um model pessoa
const Item = mongoose.model("Item",itemSchema)
export default Item