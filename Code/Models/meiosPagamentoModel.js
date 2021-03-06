var pool = require("./connection");

//vai editar os meios de pagamento de um certo utilizador
module.exports.editarMeioPagamento = async function(body) {

    try {
        let sql ="UPDATE payment_methods SET payment_method_card_name = ?, payment_method_card_number = ?, payment_method_expiry_date = ?, payment_method_cvv = ?,  payment_method_selected = ?,  payment_method_ON = ? WHERE payment_method_id=? AND payment_method_user_id=?";
        let result = await pool.query(sql,[body.cardName, body.cardNumber, body.cardExpiry, body.cardCVV, body.selected, body.paymentON, body.cardID, body.cardUserID]);


        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

//vai buscar os cartões selecionados de um certo utilizadoor
module.exports.getMeioPagamentoSelecionado = async function(id) {
    try {
        let sql = "SELECT * FROM payment_methods WHERE payment_method_user_id = ? AND payment_method_selected = true";
        let result = await pool.query(sql,[id]);
        return {status: 200, data: result[0]};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};
