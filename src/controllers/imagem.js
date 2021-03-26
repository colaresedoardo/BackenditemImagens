// import removerArquivo from '../utils/helpers'
const {removerArquivo} = require('../utils/helpers')
class ImagemController{
    constructor(imagem, multer){
        this.Imagem = imagem
        this.Multer = multer
      
        // console.log(this.parser)
    }
    async save(req, res) {
      
        this.Multer.single('file')(req, res, err => {
           
            if (err){
               
                res.status(500).json({ error: 1, payload: err });
            }
             else {
                 try{
                    
                    // const { filename, size, originalname, path } = req.file;
                    const { originalname, size, filename,  location:url = "" } = req.file;
                    // const url = `public/uploads/${filename}`;
                   

                   
                    this.Imagem.create({
                        originalname,
                        size,
                        filename,
                        url
                      },
                      function (err, img) {
                        if (err) return handleError(err);
                        res.status(200).send(img)
                      });

                 }catch(err){
                    res.status(422).send("aconteceu algum erro "+err.message)
                 }
              
            }
        })
      
      }

      async delete(req, res){
        try{
            const imagem = await this.Imagem.findById(req.params.id)
            await imagem.remove();
            return res.send(); 
        } catch(err){
            res.status(422).send("erro ao excluir: "+err.message)
         }
            

      }
      async get(req, res){
        try{
            const imagems = await this.Imagem.find({})
            res.send(imagems)

           
        } catch(err){
            res.status(400).send("erro ao excluir: "+err.message)
         }
            

      }
      async update(req, res){
       
        const id = req.params.id
       if(id != null){
        this.Multer.single('file')(req, res, err => {
           
            if (err){
               
                res.status(500).json({ error: 1, payload: err });
            }
             else {
                 try{
                    
                    const { originalname, size, filename,  location:url = "" } = req.file;
                  
                  
                    this.Imagem.findById( id , (err,imagem)=>{
                        if(err){
                          console.log("erros")
                        }else{      
                          const nomeAnterior = imagem.filename
                       
                          imagem.originalname = originalname
                          imagem.size = size
                          imagem.filename = filename
                          imagem.url = url
                         
                         imagem.save().then(
                            (i)=>{
                             removerArquivo(nomeAnterior)
                              res.send(i)
                            }
                          ).catch(
                            
                            (e)=>{
                           
                              res.status(500).send(e)
                            }
                
                          )
                        }
                       })

                 }catch(err){
                    res.status(422).send("aconteceu algum erro "+err.message)
                 }
              
            }
        })
       }

      

      }

  
    


}

export default ImagemController