var express = require('express');
var router = express.Router();
var testModel=require('../Models/testModel') 

router.get('/', async function(req, res, next) {
    let obj = req.query;
    let result = await testModel.getTest();
    res.status(result.status).send(result.data);
});

module.exports = router;