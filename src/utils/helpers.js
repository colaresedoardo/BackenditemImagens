const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const bcrpyt = require('bcryptjs')
const consts = require('../config/consts')
const jwt = require('jsonwebtoken')
module.exports ={
   removerArquivo:(filename)=>{
    console.log("tentando remover arquivo "+filename)
    let remocao =  path.resolve(__dirname, "..", "..", "tmp", "uploads", filename)
    console.log(remocao)
    return promisify(fs.unlink)(
   remocao
    );
  },

  criptografar:(valor)=>{
    return bcrpyt.hashSync(valor, consts.bcryptSalts)
  },
  compararSenha:(senhaReq, senhaDb)=>{
    return bcrpyt.compareSync(senhaReq,senhaDb)
  },
  assinar:(valor)=>{
    return jwt.sign({id:valor}, consts.keyJWT, {expiresIn: consts.expiresJWT})
  },
  verificarToken:(req, res, next)=>{
    const token = req.get('Authorization')
        if(!token){
          console.log("Token não encontrado")
            return res.status(401).json({message:"Token não encontrado"})
        }
       console.log("tentando verificar token")

    
    jwt.verify(token, consts.keyJWT, (err, decoded)=>{
      if(err || !decoded){
        console.log("Token errado")
        return res.status(401).json({message:"Token errado"})
      }
        next()
    } )

  },
  verificarUsuario(req,res, Usuario){
    const token = req.get('Authorization')
    
    jwt.verify(token, consts.keyJWT, (err, decoded)=>{
      const id = decoded.id
      Usuario.findById(id).lean().exec((err, usuario)=>{
        if(err || !usuario){
          return  res.status(500).json({message:"Erro quando tentou-se procurar os dados do usuário"})
        }
        let token  = jwt.sign({id:usuario._id}, consts.keyJWT, {expiresIn: consts.expiresJWT})
        delete usuario.password
        return res.status(200).json({...usuario,token:token})
      })
    })
  }
}
