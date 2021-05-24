const { addListener } = require("./connection");
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

module.exports.createToken = async function(id, token) {
    try {
        let sql = "INSERT INTO register_tokens(register_token, register_token_user_id) VALUES (?,?)";
        let result = await pool.query(sql, [token, id]);
        return {status: 200, data: result[0]};

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

module.exports.verifyAccount = async function(id, token) {
    try {

        let sql = "SELECT * FROM register_tokens WHERE register_token_user_id = ? AND register_token = ?";
        let result = await pool.query(sql, [id, token]);

        if (result.length > 0) {
            sql = "UPDATE users SET user_active = 1 WHERE user_id = ?";
            result = await pool.query(sql, [id]);
            return {status: 200, data: result[0]};
        }
        else {
            return {status: 404, data: {msg: "Invalid token!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};






module.exports.getUserVeiculos = async function(id) {
    try {
        let sql = "SELECT * FROM vehicles AS V, users AS U WHERE U.user_id=? AND V.vehicle_user_id = U.user_id AND V.vehicle_ON = true";
        let result = await pool.query(sql, [id]);
        if (result.length > 0) {
            return {status: 200, data: result};
        }
        else {
            return {status: 404, data: {msg: "Não existe veiculos!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



module.exports.getUserMeiospagamento = async function(id) {
    try {
        let sql = "SELECT * FROM payment_methods AS PM, users AS U WHERE U.user_id=? AND PM.payment_method_user_id = U.user_id AND PM.payment_method_ON = true";
        let result = await pool.query(sql, [id]);
        if (result.length > 0) {
            return {status: 200, data: result};
        }
        else {
            return {status: 404, data: {msg: "Não existe meios de pagamento!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};


module.exports.novoVeiculo = async function(body) {
    try {
        let sql = "INSERT INTO vehicles(vehicle_model,vehicle_brand,vehicle_registration, vehicle_registration_date, vehicle_user_id,vehicle_category) VALUES (?,?,?,?,?,?)";
        let result = await pool.query(sql, [body.vehicleModel, body.vehicleBrand, body.vehicleRegistration, body.vehicleRegistrationDate, body.vehicleUser, body.vehicleCategory]);
        return {status: 200, data: result};
 


        
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.novoParque = async function(body) {
    try {
        let sql = "INSERT INTO parks (park_name, park_spots, park_types, park_latitude, park_longitude, park_localization, park_hour_open, park_hour_close, park_contact, park_email, park_price_hour, park_create_user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        let result = await pool.query(sql, [body.parkName, body.parkSports, body.parkTypes, body.parkLatitude, body.parkLongitude, body.parkLocalizacao, body.parkOpenHour, body.parkCloseHour, body.parkContact, body.parkEmail, body.parkPrice, body.parkUserCreate]);
        return {status: 200, data: result};






    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};
module.exports.novoMeioPagamento = async function(body) {
    try {
        let sql = "INSERT INTO payment_methods(payment_method_card_name, payment_method_card_number,payment_method_expiry_date,payment_method_cvv,payment_method_selected,payment_method_user_id) VALUES (?,?,?,?,?)";
        let result = await pool.query(sql,[body.cardName, body.cardNumber, body.cardExpiry, body.cardCVV,body.selected, body.cardUser]);
        return {status: 200, data: result};





        
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};
