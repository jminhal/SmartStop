var express = require('express');
var router = express.Router();
var parquesModel = require('../Models/parquesModel');


//vai buscar as informações de todos os parques
router.get('/', async function(req, res, next) {
    let result = await parquesModel.getParques();
    res.status(result.status).send(result.data);  
});

//vai buscar as informações de um certo parque
router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let result = await parquesModel.getParque(id);
    res.status(result.status).send(result.data);  
});


//vai editar as informações de um certo meio de pagamento
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.park_id=id;
    let result = await parquesModel.editarParque(body);
    res.status(result.status).send(result.data);  
});



//Vai buscar as reservas de um certo utilizador
router.get('/:id/reservas', async function(req, res, next) {
    let id = req.params.id;
    let result = await parquesModel.getReservasParque(id);
    res.status(result.status).send(result.data);  
});

module.exports = router;