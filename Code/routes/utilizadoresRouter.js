
var express = require('express');
var router = express.Router();
var utilizadoresModel = require('../Models/utilizadoresModel') 

//vai verificar se o utilizador existe e vai buscar
router.get('/', async function(req, res, next) {
    let obj = req.query;
    let result = await utilizadoresModel.login(obj);
    res.status(result.status).send(result.data);
});

module.exports = router;