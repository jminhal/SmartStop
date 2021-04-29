var pool = require("./connection");


module.exports.getUserByEmail = async function(email) {
    try {
        let sql = "SELECT * FROM users WHERE user_email = ?";
        let utilizador = await pool.query(sql, [email]);
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

// vai adicionar o novo utilizador à base de dados 
module.exports.createUser = async function(user) {
    try {
        
        let sql = "INSERT INTO users(user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif) VALUES (?,?,?,?,?,?)";
        let result = await pool.query(sql, [ user.fullname, user.email, user.password, user.birthday, user.mobile, user.nif ]);
        return {status: 200, data: result};
        

    } catch (err) {
        console.log(err);
        if (err.errno === 1062) {
            return {status: 404, data: {msg: "This email is already associated with a user!"}};
        }
        return {status: 500, data: err};
    } 
};