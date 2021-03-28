import express from 'express'
import bodyParse from 'body-parser'
import routes from './routes'
require('dotenv/config')
console.log(`iniciando ambiente de ${process.env.NODE_ENV }`)
const path = require("path");
const cors = require('cors');

import database from './database';

const app = express()

app.use(cors())




const configExpress = () =>{
    app.use(bodyParse.json())
    app.use('/files', express.static(path.resolve(__dirname, "..", "tmp", "uploads")));
    app.use('/', routes)
   
  
    app.database = database
    return app
}

export default async () =>{
    const app = configExpress()
    await app.database.connect()
    return app
}

