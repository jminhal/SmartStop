var pool = require("./connection");


module.exports.getParques = async function() {
    try {
        let sql = "SELECT * FROM parks WHERE park_ON = true";
        let result = await pool.query(sql);
        if (result.length > 0) {
            return {status: 200, data: result};
        }
        else {
            return {status: 404, data: {msg: "Não existem parques!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



module.exports.getParque = async function(id) {
    try {
        let sql = "SELECT * FROM parks WHERE park_id = ?";
        let result = await pool.query(sql, [id]);
        if (result.length > 0) {
            return {status: 200, data: result[0]};
        }
        else {
            return {status: 404, data: {msg: "Não existe parque com este Id!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};





module.exports.editarParque = async function(body) {
    try {
        let sql = "UPDATE parks SET park_name = ?, park_types = ?, park_spots = ?, park_latitude = ?, park_longitude = ?, park_localization = ?, park_hour_open = ?, park_hour_close = ?, park_contact = ?, park_email = ?, park_price_hour = ?, park_create_user_id = ?, park_ON=? WHERE park_id = ?";
        let result = await pool.query(sql, [body.parkName, body.parkSports, body.parkTypes, body.parkLatitude, body.parkLongitude, body.parkLocalizacao, body.parkOpenHour, body.parkCloseHour, body.parkContact, body.parkEmail, body.parkPrice, body.parkUserCreate, body.parkON]);
        

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};