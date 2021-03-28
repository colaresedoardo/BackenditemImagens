require('dotenv/config')
module.exports ={
    bcryptSalts: parseInt(process.env.BCRYPTSALTS),
    keyJWT: process.env.KEYJWT,
    expiresJWT: parseInt( process.env.EXPIRESJWT)
}

