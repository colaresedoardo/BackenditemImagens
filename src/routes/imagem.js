import express from 'express'
import ImageController from '../controllers/imagem'
import multerConfig from '../config/multer'
import ImageModel from '../models/imagem'
const path = require("path");
// https://www.npmjs.com/package/multer
let multers  = require('multer')



const imageController = new ImageController(ImageModel,multers(multerConfig))

const router = express.Router({mergeParams:true})
router.post('/' , (req,res)=>{
    imageController.save(req,res)

})
router.delete('/:id', async(req, res)=>{
    imageController.delete(req,res)
})
router.get('/' , (req,res)=>{
    imageController.get(req,res)
    // res.sendFile(path.join(`${__dirname}/../../../tmp`));

})
router.patch('/:id', async(req, res)=>{
    imageController.update(req,res)
})
module.exports = router