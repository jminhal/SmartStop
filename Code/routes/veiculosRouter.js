var express = require('express');
var router = express.Router();
var veiculosModel = require('../Models/veiculosModel');



//vai buscar as informações de um certo parque
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.vehicle_id=id;
    console.log(body)
    let result = await veiculosModel.editarVeiculo(body);
    res.status(result.status).send(result.data);  
});

//vai buscar as informações dos tipos de veiculo
router.get('/tipoVeiculo', async function(req, res, next) {
    let result = await veiculosModel.getTipoVeiculo();
    res.status(result.status).send(result.data);  
});


module.exports = router;