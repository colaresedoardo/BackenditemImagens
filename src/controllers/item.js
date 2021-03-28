class ItemController{
    constructor(Item){
        this.Item = Item
    }
    async create(req, res) {
        try{
        
          console.log(req.body)
          let idItemPai = req.body.item
          console.log("id pai "+idItemPai)
       
          let dados ={
            titulo: req.body.titulo,
            linkResource:req.body.linkResource,
            imagem: req.body.imagem,
           
          }
        //  registrando na base o item
          this.Item.create({...dados},
          (err, item)=> {
            if (err){
              console.log("não pra entrar aqui")
              return handleError(err);
            }
            if(idItemPai == null || idItemPai==''){
              // entra aqui se for um item independente
              console.log("aqui")
              console.log(item)
              res.send(item)
            }else{
            //  se for subitem então entra aqui, pesquisadno o id do item superior
              this.Item.findById( idItemPai , (err,ite)=>{
                if(err){
                  console.log("erros")
                }else{      
                // relaciando o item filho ao item pai
                  ite.item.push(item._id)
                  ite.categoria =true
               

                  ite.save().then(
                    ()=>{
                      this.Item.updateOne({_id:item._id}, {subitem:true}, (err, item)=>{
                        if(err){
                          console.log("erros ao alterar pra subitem")
                        }
                        else{
                          console.log("alterado pra subitem true")
                         
                          
                        }
                      })
                      // pesquisando o item filho atualizado para retornar para cliente
                      this.Item.findById( item._id , (err,ite)=>{
                        if(err){
                          res.status(500).send(e)
                          console.log("erros ao alterar pra subitem")
                        }
                        else{
                          
                          res.send(ite)
                          
                        }

                      })
                    
                    
                    }
                  ).catch(
                    
                    (e)=>{
                   
                      res.status(500).send(e)
                    }
        
                  )
                }
              })
            }
         
			    
        
            
          }
          )

          // this.Item.findById( req.params.id , (err,item)=>{

          // })
         
          // await item.save();
          // res.status(201).send({item});
        }catch(err){
          console.log(err)
          res.status(422).send(err.message)
        }
       
        // Menor teste para passar no teste de unidade
        // return await Promise.resolve(res.send(req.body));
      }

      async get(req, res){
  
        
        try{
            const item = await this.Item.find().sort({titulo:1}).populate('item').populate('imagem');
            res.send(item)
        }catch(err){
            res.status(400).send(err.item)
        }
        
    }
    async getById(req, res){

  }
    async delete(req,res){
      try{

        let idFilho =req.params.id
        console.log("IdFilho")
        console.log(idFilho)
        await this.Item.find({item: idFilho}, (err, i)=>{
          if(err){
            console.log("erros")
          }else{    
           console.log("IdPai")
         
           let idPai = i == '' ? null: i[0]._id
          
          console.log(idPai)
          if(!(idPai == null)){
            console.log("IdPai")
            console.log(i)
            this.Item.updateOne({_id: idPai}, {$pull: {item: idFilho }}, (err,item)=>{
            if(err){
                  console.log(err)
                }
                else{
                  console.log("quantidade de items")
                  console.log(item.length)
                  console.log("após a remoção")
                  console.log(item)
                }

            });
          }
          

          }
        }).exec()
       
         const item = await this.Item.findById(req.params.id)
         console.log("item a ser removido")
         console.log(item)
         await this.Item.deleteOne(item);
        return res.send({}); 
    } catch(err){
        res.status(422).send(err.message)
     }
    }

    async update(req,res){
      
       this.Item.findById( req.params.id , (err,item)=>{
        if(err){
          console.log("erros")
        }else{      
          console.log("alterado")
          console.log(item)
          let idFilho =""
          if(req.body.item){
            idFilho =req.body.item
          }
          item.titulo = req.body.titulo
          item.linkResource = req.body.linkResource
          item.imagem = req.body.imagem
        
          if(req.body.item == ''){
            item.item= req.body.item
            // item.subitem =true
          }else{
            item.item.push(req.body.item)
            item.categoria =true
          }

        
          console.log("Item a ser alterado")
          console.log(item)
          item.save().then(
            (i)=>{
              this.Item.updateOne({_id:idFilho}, {subitem:true}, (err, item)=>{
                if(err){
                  console.log("erros ao alterar pra subitem")
                }
                else{
                  console.log("alterado pra subitem true")
                 
                  
                }
              })
              res.send(i)
            }
          ).catch(
            
            (e)=>{
           
              res.status(500).send(e)
            }

          )
        }
       })
     
  
    
     
    }

}

export default ItemController