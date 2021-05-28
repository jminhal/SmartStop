var pool = require("./connection");

// editar um certo veiculo
module.exports.editarVeiculo = async function() {
    try {
        let sql = "UPDATE vehicles SET vehicle_model = ?, vehicle_brand = ?, vehicle_registration = ?, vehicle_registration_date = ?,  vehicle_category = ?, vehicle_selected = ?, vehicle_ON = ? WHERE vehicle_id=? AND vehicle_user_id=?";
        let result = await pool.query(sql,[body.vModel, body.vBrand, body.vRegistration, body.vDate, body.vCategory, body.vSelected, body.vON, body.vID, body.vUserID]);
        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



//vai buscar as informações dos tipos de veiculo
module.exports.getTipoVeiculo = async function() {
    try {
        let sql = "SELECT * FROM vehicleCategories";
        let result = await pool.query(sql);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};


