async function addCustomer(res,payload){
    
    const {name,noOfInvoices} = payload;
    let connection = res.connection1;
    try{
        const sqlObject = {name:name, no_of_invoices:noOfInvoices}
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


async function addInvoice(res,payload){
    
    const {name,noOfInvoices} = payload;
    let connection = res.connection1;
    try{
        const sqlObject = {name:name, no_of_invoices:noOfInvoices}
        const columns = Object.keys(sqlObject).join(', '); 
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
        const values = Object.values(sqlObject); 

        const sql = `INSERT INTO invoice (${columns}) VALUES (${placeholders})`;
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;

    }
}


module.exports = {addCustomer};