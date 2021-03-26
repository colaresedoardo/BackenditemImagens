module.exports ={
    // bcryptSalts:10,
    // keyJWT:"123456789",
    // expiresJWT:7200

    bcryptSalts:process.env.BCRYPTSALTS,
    keyJWT:process.env.KEYJWT,
    expiresJWT:process.env.EXPIRESJWT
}