var express = require('express');
var router = express.Router();
var meiosPagamentoModel = require('../Models/meiosPagamentoModel.js');




//vai editar as informações de um certo meio de pagamento
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.payment_method_id=id;
    console.log(body)
    let result = await meiosPagamentoModel.editarMeioPagamento(body);
    res.status(result.status).send(result.data);  
});



//vai buscar as informações dos tipos de veiculo
router.get('/:id/selecionado', async function(req, res, next) {
    let id = req.params.id;
    let result = await meiosPagamentoModel.getMeioPagamentoSelecionado(id);
    res.status(result.status).send(result.data);  

});






module.exports = router;