const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = require('./models/connection');
const addProduct = require('./models/product');

const buildconnection = async (req,res,next)=>{
    res.connection = connection;
    next();
}  
app.use(buildconnection);

app.get('/',(req,res)=>{
    console.log("hello");
    res.send("Well done!!!");
})

app.post('/add-product',(req,res)=>{
    const {productName, price, remainingQty} = req.body;
    try{
        const result = addProduct(res,{productName, price, remainingQty});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})


app.listen(3000,()=>{
    console.log("Listen to port 3000");
})