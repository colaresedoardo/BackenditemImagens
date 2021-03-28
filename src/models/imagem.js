const mongoose = require("mongoose");
// const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
require('dotenv/config')
const imagemSchema = new mongoose.Schema({
    originalname: String,
    size: Number,
    filename: String,
    url: String,
    createdAt: {
     type: Date,
        default: Date.now,
    },
    
    
})

imagemSchema.pre("save", function () {
    if (!this.url) {

      this.url = `${process.env.APP_URL}:${process.env.PORT_SERVICE}/files/${this.filename}`;
      // this.url = `http://localhost:5000/files/${this.filename}`;
    }
    
  });


imagemSchema.pre("remove", function () {
 
      return promisify(fs.unlink)(
        path.resolve(__dirname, "..", "..", "tmp", "uploads", this.filename)
      );
    }
  );
  
imagemSchema.pre('updateOne', function () {
  if (!this.url) {
    // this.url = `${process.env.APP_URL}/files/${this.filename}`;
    this.url = `http://localhost:5000/files/${this.filename}`;
  }
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.filename)
    );
    
})


//Criando um model pessoa
const Imagem = mongoose.model("Imagem",imagemSchema)
export default Imagem