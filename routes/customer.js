const express = require('express');
const app = express();
const {checkUserExists} = require('../middleware.js');
const {addInvoice,payment,seeInvoice,deleteInvoice} = require('../models/customer.js');

const routeAddInvoice = app.post('/add-invoice/name/:name',checkUserExists, async (req,res)=>{
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
const routeAddPayment = app.post('/:id/payment/name/:name',checkUserExists,async (req,res)=>{
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

const routeSeeInvoice = app.get('/:id/see-invoice/name/:name',checkUserExists,async (req,res)=>{
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
const routeDeleteInvoice = app.put('/:id/delete-invoice/name/:name',checkUserExists,async (req,res)=>{
    const {id,name} = req.params;
    try{
        const result = await deleteInvoice(res,{id});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

module.exports = {routeAddInvoice,routeAddPayment,routeSeeInvoice,routeDeleteInvoice};