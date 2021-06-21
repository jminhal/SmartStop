var express = require('express');
var router = express.Router();
var meiosPagamentoModel = require('../Models/meiosPagamentoModel.js');




//vai editar os meios de pagamento de um certo utilizador
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.cardID=id;
    let result = await meiosPagamentoModel.editarMeioPagamento(body);
    res.status(result.status).send(result.data);  
});

//vai buscar os cartões selecionados de um certo utilizadoor
router.get('/:id/selecionado', async function(req, res, next) {
    let id = req.params.id;
    let result = await meiosPagamentoModel.getMeioPagamentoSelecionado(id);
    res.status(result.status).send(result.data);  

});






module.exports = router;