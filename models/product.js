async function addProduct(res,payload){

    const {productName, price, remainingQty} = payload;
    let connection = res.connection;
    try{
        const sqlObject = {product_name:productName, price:price, remaining_qty:remainingQty}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 

        const sql = `INSERT INTO products ${columns} values ${placeholders}`;
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;

    }
}

module.exports = {addProduct};