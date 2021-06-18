var pool = require("./connection");


module.exports.getParques = async function() {
    try {
        let sql = "SELECT * FROM parks WHERE park_ON = true";
        let parks = await pool.query(sql);
        if (parks.length > 0) {
            for(let park of parks){
                sql="SELECT COUNT(reservation_id) AS 'lugarOcupados' FROM reservations WHERE reservation_park_id = ?";
                let spots = await pool.query(sql, [park.park_id]);
                park.lugarOcupados = spots[0].lugarOcupados;

            }
            return {status: 200, data: parks};
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
        sql="SELECT COUNT(reservation_id) AS 'lugarOcupados' FROM reservations WHERE reservation_park_id = ?";
        let spots = await pool.query(sql, [id]);
        result[0].lugarOcupados = spots[0].lugarOcupados;


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
        console.log(body)
        let sql = "UPDATE parks SET park_name = ?, park_spots = ?, park_types = ?, park_latitude = ?, park_longitude = ?, park_localization = ?, park_hour_open = ?, park_hour_close = ?, park_contact = ?, park_email = ?, park_price_hour = ?, park_create_user_id = ?, park_ON=? WHERE park_id = ?";
        let result = await pool.query(sql, [body.parkName, body.parkSports, body.parkTypes, body.parkLatitude, body.parkLongitude, body.parkLocalizacao, body.parkOpenHour, body.parkCloseHour, body.parkContact, body.parkEmail, body.parkPrice, body.parkUserCreate, body.parkON, body.parkID]);
 
                    
        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};





module.exports.getReservasParque = async function(id) {
    try {

        let sql = "SELECT P.park_name, U.user_fullname,  DATE_FORMAT(R.reservation_start_day, '%d-%m-%y') AS 'reservation_start_day' , DATE_FORMAT(R.reservation_duration, '%H:%i:%s') AS 'reservation_duration',P.park_price_hour, V.vehicle_model, V.vehicle_brand, MP.payment_method_card_number FROM parks AS P, reservations AS R, users AS U, vehicles AS V, payment_methods AS MP WHERE P.park_id=R.reservation_park_id AND  R.reservation_payment_method=MP.payment_method_id AND V.vehicle_id=R.reservation_vehicle AND P.park_id=?";
        let result = await pool.query(sql, [id]);
        if (result.length > 0) {
            return {status: 200, data: result};
        }
        else {
            return {status: 404, data: {msg: "Não existe reservas nesse parque"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};


