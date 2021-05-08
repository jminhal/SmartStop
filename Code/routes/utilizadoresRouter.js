var express = require('express');
var router = express.Router();
var utilizadoresModel = require('../Models/utilizadoresModel');

var { genSaltSync, hashSync, compareSync } = require('bcrypt');
var nodemailer = require('nodemailer');

//Criar um nova utilizador
router.post('/register', async function(req, res, next) {
    let body = req.body;
    let salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    let result = await utilizadoresModel.createUser(body);

    if (result.status === 200) { //Se a conta for criada, então vai enviar um código pelo email, para verificar a conta

        let transporter = nodemailer.createTransport({
            host: 'trappist.extravm.com',
            port: 465,
            secure: true,
            auth: {
                user: "smartstop-token@smartstop.com",
                pass: "smartstopadmin"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let token = Math.random().toString(36).slice(-4);

        let info = await transporter.sendMail({
            from: '"SmartStop" <smartstop-token@smartstop.com>', // sender address
            to: body.email, // list of receivers
            subject: "Activation code", // Subject line
            text: "Please use this code: " + token +" to activate your account."
        });

        console.log("Message sent: %s", info.messageId);

        await utilizadoresModel.createToken(result.data.insertId, token);

        return res.json({
            success: 1,
            msg: "register successfully",
            data: result.data
        });

    }else {
        res.status(result.status).send(result.data);
    }
});

//vai verificar se o utilizador existe e vai buscar
router.get('/login', async function(req, res, next) {
    let obj = req.query;
    let result = await utilizadoresModel.getUserByEmail(obj.email);

    if (result.status === 200) {

        let checkPassword = compareSync(obj.password, result.data.user_password);
        if (checkPassword) {
            if (result.data.user_active) { //se estiver verificada
                return res.json({
                    success: 1,
                    msg: "login successfully",
                    data: result.data
                });
            } else {
                return res.json({
                    success: 3,
                    msg: "Your account is not yet active!"
                });
            }
        } else {
            return res.json({
                success: 0,
                msg: "Invalid email or password"
            });
        }

    }

    res.status(result.status).send(result.data);
});

//vai verificar um utilizador
router.put('/verify', async function(req, res, next) {
    let body = req.body;
    let result = await utilizadoresModel.getUserByEmail(body.email);
    let checkPassword = compareSync(body.password, result.data.user_password); //Verifica se as passwords sao iguais
    if (checkPassword) { //se for igual, então vai verificar se token está bem
        result = await utilizadoresModel.verifyAccount(result.data.user_id, body.token);
        if (result.status === 200) {
            return res.json({
                success: 1,
                msg: "Account successfully verified!"
            });
        }
    }
    else {
        return res.json({
            success: 0,
            msg: "Invalid email or password"
        });
    }
    res.status(result.status).send(result.data);
});

//Vai buscar os veiculos de um certo utilizador
router.get('/:id/veiculos', async function(req, res, next) {
    let id = req.params.id;
    let result = await utilizadoresModel.getUserVeiculos(id);
    res.status(result.status).send(result.data);  
});


//Vai buscar os veiculos de um certo utilizador
router.get('/:id/meiospagamento', async function(req, res, next) {
    let id = req.params.id;
    let result = await utilizadoresModel.getUserMeiospagamento(id);
    res.status(result.status).send(result.data);  
});



//Vai adicionar um novo veiculo a um certo utilizador
router.post('/:id/veiculos/novo', async function(req, res, next) {
    let id = req.params.id; 
    let body = req.body;
    body.vehicle_user_id = id;
    let result = await utilizadoresModel.novoVeiculo(body);
    res.status(result.status).send(result.data);  
});

//Vai adicionar um nnovo parque
router.post('/:id/parque/novo', async function(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    body.park_create_user_id = id;
    let result = await utilizadoresModel.novoParque(body);
    res.status(result.status).send(result.data); 
});

//Vai adicionar um novo meio de pagamento a um certo utilizador
router.post('/:id/meiospagamento/novo', async function(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    body.payment_method_user_id = id;
    let result = await utilizadoresModel.novoMeioPagamento(body);
    res.status(result.status).send(result.data); 
});




module.exports = router;