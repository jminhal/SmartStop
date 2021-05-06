var pool = require("./connection");


module.exports.editarMeioPagamento = async function() {
    try {
        let sql = "UPDATE payment_method SET payment_method_card_number = ?, payment_method_expiry_date=?, payment_method_cvv=?, payment_method_user_id=? WHERE payment_method_id = ?";
        let result = await pool.query(sql,[body.cardNumber,body.expiryDate, body.cvv, body.cardNumber, body.payment_method_id]);
        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



module.exports.removerMeioPagamento = async function(id) {
    try {
        let sql = "UPDATE payment_method SET payment_method_ON = false WHERE payment_method_id = ?";
        let result = await pool.query(sql, [id]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

