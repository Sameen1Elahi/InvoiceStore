const express = require('express');
const app = express();
const {addProduct} = require('./models/product.js');

const routeAddProduct = app.post('/add-product',async (req,res)=>{
    const {productName, price, remainingQty} = req.body;
    try{
        console.log("before");
        const result = await addProduct(res,{productName, price, remainingQty});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

module.exports = {routeAddProduct}