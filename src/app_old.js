const mongoose = require('mongoose')
import ProductsController from '../controllers/products'
const express = require('express');
const bodyParser = require('body-parser');
//habilita referencia cruzada no node
const cors = require('cors');
//framework para interpretra requisição http
const app = express();
const api = require('./routes/api')
const auth = require('./routes/auth')
const item = require('./routes/item')
// const router = express.Router()
//adiciona um middlware tanto na entrada como na saída
//
app.use(bodyParser.json());
//interpretação de atributos via url
app.use(bodyParser.urlencoded({extended:true}));
//pode requisitar de outra porta e outro domínio
app.use(cors());

app.use('/api',api)
app.use('/site',item)
app.use('/auth',auth)

mongoose.connect('mongodb://127.0.0.1:27017/auth_test',{
     useNewUrlParser: true, useUnifiedTopology: true 
});




app.use((req, res, next)=>{
    res.status(404).send('Nod found')
})


app.listen(3000)