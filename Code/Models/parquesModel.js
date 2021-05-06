var pool = require("./connection");


module.exports.getParques = async function() {
    try {
        let sql = "SELECT * FROM parks";
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


module.exports.removerParque = async function(id) {
    try {
        let sql = "UPDATE parks SET park_ON = false WHERE park_id = ?";
        let result = await pool.query(sql, [id]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};


module.exports.editarMeioPagamento = async function(body) {
    try {
        let sql = "UPDATE park_name = ?, park_name = ?, park_spots = ?, park_latitude = ?, park_longitude = ?, park_hour_open = ?, park_hour_close = ?, park_contact = ?, park_create_user_id=? WHERE park_id = ?";
        let result = await pool.query(sql, [body.name, body.sports, body.latitude, body.longitude, body.openHour,body.closeHour,body.contact, body.contact, body.price,body.create_user_id, body.park_id]);
        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



