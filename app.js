const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = require('./models/connection.js');
const {routeAddUser} = require('./routes/user.js');
const {routeAddProduct,routeSeeProducts} = require('./routes/product.js');
const {routeAddInvoice,routeAddPayment,routeSeeInvoice,routeDeleteInvoice} = require('./routes/customer.js');

const buildconnection = async (req,res,next)=>{
    res.connection1 = connection;
    next();
}  
app.use(buildconnection);

app.use(routeAddUser);
app.use(routeAddProduct);
app.use(routeSeeProducts);
app.use(routeAddInvoice);
app.use(routeAddPayment);
app.use(routeSeeInvoice)
app.use(routeDeleteInvoice);

// listen to port
app.listen(8080,()=>{
    console.log("Listen to port 8080");
})