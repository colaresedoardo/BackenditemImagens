import express from 'express'
import AuthController from '../controllers/auth'
import Usuario from '../models/usuario'

const router = express.Router()
const authController = new AuthController(Usuario)

router.post('/login',(req,res)=>{
     authController.login(req,res)
})
router.post('/registrar',(req,res)=>{
    authController.create(req,res)
})
router.use(authController.check_token)

router.get('/usuario',(req,res)=>{
    authController.user_date(req,res)
})

module.exports = router