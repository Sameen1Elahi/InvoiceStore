const connection = require('./models/connection.js');

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

module.exports = {checkUserExists};