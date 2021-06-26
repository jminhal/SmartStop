var express = require('express');
var router = express.Router();
var parquesModel = require('../Models/parquesModel');


//vai buscar todos os parques
router.get('/', async function(req, res, next) {
    let result = await parquesModel.getParques();
    res.status(result.status).send(result.data);  
});

//vai buscar toda a informação de um parque
router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let result = await parquesModel.getParque(id);
    res.status(result.status).send(result.data);  
});

//Vai buscar os utilizadores que têm reserva naquele parque 
router.get('/:id/reservas', async function(req, res, next) {
    let id = req.params.id;
    let result = await parquesModel.getReservasParque(id);
    res.status(result.status).send(result.data);  
});




//vai editar um certo meio de pagamento
router.put('/:id/editar', async function(req, res, next) { 
    let id = req.params.id;
    let body = req.body;
    body.park_id=id;
    let result = await parquesModel.editarParque(body);
    res.status(result.status).send(result.data);  
});


module.exports = router;