var express = require('express');
var router = express.Router();
var meiosPagamentoModel = require('../Models/meiosPagamentoModel.js');


//vai remover um meio de pagamento de um certo utilizador
router.delete('/:id/remover', async function(req, res, next) {
    let id = req.params.id;
    let result = await meiosPagamentoModel.removerMeioPagamento(id);
    res.status(result.status).send(result.data);  
});

//vai editar as informações de um certo meio de pagamento
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.payment_method_id=id;
    let result = await meiosPagamentoModel.editarMeioPagamento(body);
    res.status(result.status).send(result.data);  
});


module.exports = router;