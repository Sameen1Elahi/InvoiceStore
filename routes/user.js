const express = require('express');
const app = express();

const {addUser} = require('../models/customer.js');


const routeAddUser = app.post('/add-user',async (req,res)=>{
    const {name,email} = req.body;
    try{
        const result = await addUser(res,{name,email});
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})
module.exports = {routeAddUser};