const express = require('express');
const app = express();
const {addProduct,seeProducts} = require('../models/product.js');
const {checkUserExists} = require('../middleware.js');

const routeAddProduct = app.post('/add-product/name/:name', checkUserExists,async (req,res)=>{
    const {productName, price, remainingQty} = req.body;
    try{
        const result = await addProduct(res,{productName, price, remainingQty});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeSeeProducts = app.get('/see-products/name/:name', checkUserExists,async (req,res)=>{
    try{
        const result = await seeProducts(res);
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})
module.exports = {routeAddProduct,routeSeeProducts}