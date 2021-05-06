var pool = require("./connection");

// editar um certo veiculo
module.exports.editarVeiculo = async function() {
    try {
        let sql = "UPDATE vehicles SET vehicle_model = ?, vehicle_brand=?, vehicle_registration=?, vehicle_category=? WHERE vehicle_id = ?";
        let result = await pool.query(sql,[body.model,body.brand, body.registration, body.category, body.vehicle_id]);
        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};


// remover um certo veiculo
module.exports.removerVeiculo = async function(id) {
    try {
        let sql = "UPDATE vehicles SET vehicle_ON = false WHERE vehicle_id = ?";
        let result = await pool.query(sql, [id]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};


