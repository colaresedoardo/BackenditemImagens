class ItemController{
    constructor(Item){
        this.Item = Item
    }
    async create(req, res) {
        try{
          
          
        
          this.Item.create({...req.body , imagem: req.body.imagem},
          (err, i)=> {
            if (err) return handleError(err);
			    	console.log(i)
            res.status(200).send(i)
              
          }
          )



          // await item.save();
          // res.status(201).send({item});
        }catch(err){
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
        const item = await this.Item.findById(req.params.id)
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
          item.titulo = req.body.titulo
          item.linkResource = req.body.linkResource
          item.imagem = req.body.imagem
          item.item = req.body.item
          item.save().then(
            (i)=>{
              
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