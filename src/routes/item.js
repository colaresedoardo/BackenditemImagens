import express from 'express'
import ItemController from '../controllers/Item'
import Item from '../models/item'

const router = express.Router()
const itemController = new ItemController(Item)

router.post('/item',(req,res)=>{
    itemController.create(req,res)
})
router.get('/item',(req,res)=>{
    itemController.get(req,res)
})
router.delete('/item/:id',(req,res)=>{
    
    itemController.delete(req,res)
})
router.patch('/item/:id',(req,res)=>{
   
    itemController.update(req,res)
})

module.exports = router