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


async function addInvoice(res,payload){
    
    const {madeBy, productId, quantity} = payload;
    let connection = res.connection1;
    try{
        console.log("start");
        const sqlObject = {made_by:madeBy, product_id:productId, quantity:quantity}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 
        console.log("start1");
        const sql1 = "SELECT remaining_qty FROM products WHERE products.id = ?";
        const [result1] = await (await connection).execute(sql1,[productId]);
        console.log(result1[0].remaining_qty);
        console.log(quantity);
        if (result1[0].remaining_qty > quantity){
            const sql2 = "UPDATE products SET remaining_qty = remaining_qty - ? WHERE products.id = ? AND remaining_qty >= ? "
            const [result2] = await (await connection).execute(sql2,[quantity,productId,quantity]);
            console.log(result2); 
            const sql = `INSERT INTO invoice (${columns}) VALUES (${placeholders})`;
            const [result] = await (await connection).execute(sql,values);
            const sql3 = "SELECT products.price,products.product_name FROM products JOIN invoice ON products.id = ?"
            const [result3] = await (await connection).execute(sql3,[productId]);
            console.log(result3[0].price,result3[0].product_name);
            let total = quantity*result3[0].price;
            let price = result3[0].price;
            const sql4 = "UPDATE invoice SET product_name = ?, price = ?, total_price = ? WHERE product_id = ?"
            const [result4] = await (await connection).execute(sql4,[result3[0].product_name,price, total, productId]);
            console.log(result4);
            return result4;
        }
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}



async function payment(res,payload){
    
    const {byCash, byCard} = payload;
    let connection = res.connection1;
    try{
        const sqlObject = {byCash, byCard}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 

        const sql = `INSERT INTO customer (${columns}) VALUES (${placeholders})`;
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}


module.exports = {addUser,addInvoice, payment};