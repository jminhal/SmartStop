var pool = require("./connection");

//vai editar as informações de um certo veiculo
module.exports.editarVeiculo = async function(body) {
    try {
        let sql = "UPDATE vehicles SET vehicle_model = ?, vehicle_brand = ?, vehicle_registration = ?, vehicle_registration_date = ?,  vehicle_category = ?, vehicle_selected = ?, vehicle_ON = ? WHERE vehicle_id=? AND vehicle_user_id=?";
        let result = await pool.query(sql,[body.vModel, body.vBrand, body.vRegistration, body.vDate, body.vCategory, body.vSelected, body.vON, body.veiculoID, body.vUserID]);
       // console.log(result)

        return {status: 200, data: result};
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



//vai os tipos de veiculo
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

//vai buscar os veiculos selecionados de um certo utilizadoor
module.exports.getVeiculoSelecionado = async function(id) {
    try {
        let sql = "SELECT * FROM vehicles WHERE vehicle_user_id = ? AND vehicle_selected = true";
        let result = await pool.query(sql,[id]);
        console.log(result)
        return {status: 200, data: result[0]};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};



