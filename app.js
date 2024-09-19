const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = require('./models/connection.js');
const {addProduct,seeProducts} = require('./models/product.js');
const {addUser,addInvoice,payment,seeInvoice,deleteInvoice} = require('./models/customer.js');


const buildconnection = async (req,res,next)=>{
    res.connection1 = connection;
    next();
}  
app.use(buildconnection);

const checkUserExists = async (req, res, next) => {
    const {name} = req.params;
    const sql = "SELECT * FROM user WHERE name = ?";
    const [result] = await (await connection).execute(sql, [name]);

    // Check if the user exists in the database
    if (result.length > 0) {
        req.user = result[0];
        next();  
    } else {
        return res.status(404).json({ message: "User not found" });
    }
}

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

// add the product in store 
app.post('/add-product/name/:name',checkUserExists,async (req,res)=>{
    const {productName, price, remainingQty} = req.body;
    try{
        const result = await addProduct(res,{productName, price, remainingQty});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

//add the invoice 
app.post('/add-invoice/name/:name',checkUserExists, async (req,res)=>{
    const {name:madeBy} = req.params;
    const {productId, quantity} = req.body;
    try{
        const result = await addInvoice(res,{madeBy, productId, quantity});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the invoice");
    }
})

// add the payment method
app.post('/:id/payment/name/:name',checkUserExists,async (req,res)=>{
    const {id:invoiceId} = req.params;
    const {byCash, byCard} = req.body;
    try{
        const result = await payment(res,{invoiceId, byCash, byCard});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error during payment");
    }
})

// see all the products from store
app.get('/see-products/name/:name',checkUserExists,async (req,res)=>{
    try{
        const result = await seeProducts(res);
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

// see one specific invoice with payment
app.get('/:id/see-invoice/name/:name',checkUserExists,async (req,res)=>{
    const {id,name} = req.params; 
    try{
        const result = await seeInvoice(res,{id});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

// delete invoice 
app.put('/:id/delete-invoice/name/:name',checkUserExists,async (req,res)=>{
    const {id,name} = req.params;
    try{
        const result = await deleteInvoice(res,{id});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

// listen to port
app.listen(8080,()=>{
    console.log("Listen to port 8080");
})