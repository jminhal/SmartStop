
var express = require('express');
var router = express.Router();
var utilizadoresModel = require('../Models/utilizadoresModel');
//var { genSaltSync, hashSync, compareSync } = require('bcrypt');
//var nodemailer = require('nodemailer');
/*
//Crirar um nova utilizador
router.post('/', async function(req, res, next) {
    let body = req.body;
    //let salt = genSaltSync(10);
    //body.password = hashSync(body.password, salt);
    let result = await utilizadoresModel.createUser(body);

    if (result.status === 200) { //Se a conta for criada, então vai enviar um código pelo email, para verificar a conta

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: '"SmartStop 👻" <amaro.miguel1999@gmail.com>', // sender address
            to: body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
        })

    } else {
        res.status(result.status).send(result.data);
    }
});
*/
//vai verificar se o utilizador existe e vai buscar
router.get('/', async function(req, res, next) {
    let obj = req.body;
    let result = await utilizadoresModel.login(obj);
    res.status(result.status).send(result.data);
});

module.exports = router;