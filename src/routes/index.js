import express from 'express'
import itemRoute from './item'
import imagem from './imagem'
import auth from './auth'
import authGoogle from './auth_google'
import AuthController from '../controllers/auth'
const authController = new AuthController()

const router = express.Router()
router.use('/auth/google',authGoogle)
router.use('/auth',auth)
router.use(authController.check_token)
router.use('/site',itemRoute)
router.use('/imagem',imagem)

// router.use('/users', usersRoute)
router.get('/', (req,res)=>{
    res.send("hello")
})

module.exports = router