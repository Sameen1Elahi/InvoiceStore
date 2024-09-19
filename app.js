const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = require('./models/connection.js');
const {addProduct} = require('./models/product.js');
const {addUser,addInvoice} = require('./models/customer.js');


const buildconnection = async (req,res,next)=>{
    res.connection1 = connection;
    next();
}  
app.use(buildconnection);

app.get('/',(req,res)=>{
    console.log("hello");
    res.send("Well done!!!");
})

// add the product in store 
app.post('/add-product',async (req,res)=>{
    const {productName, price, remainingQty} = req.body;
    try{
        const result = await addProduct(res,{productName, price, remainingQty});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

//add the user in database
app.post('/add-user',async (req,res)=>{
    const {name,email} = req.body;
    try{
        const result = await addUser(res,{name,email});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

//add the invoice 
app.post('/add-invoice',async (req,res)=>{
    const {madeBy, productId, quantity} = req.body;
    try{
        const result = await addInvoice(res,{madeBy, productId, quantity});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the invoice");
    }
})


app.post('/payment',async (req,res)=>{
    const {byCash, byCard} = req.body;
    try{
        const result = await payment(res,{byCash, byCard});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error during payment");
    }
})



app.listen(8080,()=>{
    console.log("Listen to port 8080");
})