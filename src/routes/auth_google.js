import express from 'express'
var passport = require("passport");


const router = express.Router()

//chama a página do google para autenticar
router.get('/',(req,res)=>{
    console.log("entrei no primeiro passo")
   passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
   ] })

})

// chama essa requisição após o google sinalizar que tá ok
router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(`http://localhost:4200`);
});

module.exports = router