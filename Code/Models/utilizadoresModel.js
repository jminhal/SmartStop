var pool = require("./connection");

// vai verificar se o utilizador existe e fazer o login
module.exports.login = async function(obj) {
    try {

        let sql = "SELECT * FROM user WHERE email = ? AND pw = ?";
        let utilizador = await pool.query(sql, [ obj.email ]);

        if (utilizador.length > 0) {
            return {status: 200, data: utilizador[0]};
        }
        else {
            return {status: 404, data: {msg: "Esta conta não existe"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};