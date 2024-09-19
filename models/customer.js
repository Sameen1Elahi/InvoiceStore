// add the user in database
async function addUser(res,payload){
    const {name,email} = payload;
    let connection = res.connection1;
    try{
        const sqlObject = {name:name, email:email}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 
        const sql = `INSERT INTO user (${columns}) VALUES (${placeholders})`;
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}


// make the invoice function 
async function addInvoice(res,payload){
    const {madeBy, productId, quantity} = payload;
    let connection = res.connection1;
    try{
        
        const sqlObject = {made_by:madeBy, product_id:productId, quantity:quantity}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 

        const sql1 = "SELECT remaining_qty FROM products WHERE products.id = ?";
        const [result1] = await (await connection).execute(sql1,[productId]);
       
        if (result1[0].remaining_qty > quantity){
            const sql2 = "UPDATE products SET remaining_qty = remaining_qty - ? WHERE products.id = ? AND remaining_qty >= ? "
            const [result2] = await (await connection).execute(sql2,[quantity,productId,quantity]);
          
            const sql = `INSERT INTO invoice (${columns}) VALUES (${placeholders})`;
            const [result] = await (await connection).execute(sql,values);
            
            const sql3 = "SELECT products.price,products.product_name FROM products JOIN invoice ON products.id = ?"
            const [result3] = await (await connection).execute(sql3,[productId]);
            
            let total = quantity*result3[0].price;
            let price = result3[0].price;

            const sql4 = "UPDATE invoice SET product_name = ?, price = ?, total_price = ? WHERE product_id = ?"
            const [result4] = await (await connection).execute(sql4,[result3[0].product_name,price, total, productId]);
            return result4;
        }
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}


// make the payment function
async function payment(res,payload){
    const {invoiceId, byCash, byCard} = payload;
    let connection = res.connection1;
    try{
        const sql3 = "SELECT total_price FROM invoice WHERE id = ?";
        const [result3] = await (await connection).execute(sql3,[invoiceId]);
        
        const sqlObject = {invoice_id:invoiceId, by_cash:byCash, by_card: byCard, total_payment:result3[0].total_price}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 

        const sql = `INSERT INTO payment (${columns}) VALUES (${placeholders})`;
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}


// see one specific invoice by id
async function seeInvoice(res,payload){
    const {id} = payload;
    let connection = res.connection1;
    try{ 
        const sql = `SELECT * FROM invoice i JOIN payment p ON p.invoice_id = i.id WHERE i.id = ?`;
        const [result] = await (await connection).execute(sql,[id]);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}


// soft delete the invoice if customer not paid
async function deleteInvoice(res,payload){
    const {id} = payload;
    let connection = res.connection1;
    try{ //UPDATE friend SET deleted_at = NOW() WHERE user_id = ? AND friend_user_id = ?
        const sql = `UPDATE invoice SET deleted_at = NOW() WHERE invoice.id = ?`;
        const [result] = await (await connection).execute(sql,[id]);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}

module.exports = {addUser,addInvoice,payment,seeInvoice,deleteInvoice};