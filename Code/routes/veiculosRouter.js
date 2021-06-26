var express = require('express');
var router = express.Router();
var veiculosModel = require('../Models/veiculosModel');



//vai editar as informações de um certo veiculo
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.veiculoID=id;
    let result = await veiculosModel.editarVeiculo(body);
    res.status(result.status).send(result.data);  
});

//vai buscar os veiculos selecionados de um certo utilizadoor
router.get('/:id/selecionado', async function(req, res, next) {
    let id = req.params.id;
    let result = await veiculosModel.getVeiculoSelecionado(id);
    res.status(result.status).send(result.data);  

});



//vai os tipos de veiculo
router.get('/tipoVeiculo', async function(req, res, next) {
    let result = await veiculosModel.getTipoVeiculo();
    res.status(result.status).send(result.data);  
});


module.exports = router;