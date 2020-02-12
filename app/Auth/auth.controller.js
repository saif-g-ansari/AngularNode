const mysql = require('mysql');
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 16;
const jwt = require('jsonwebtoken');
const SECRET_KEY = "secretkey12345";
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: "secretkey12345" });
var crypto = require('crypto');

// authorization 
exports.isAuthenticated = () => {
    return compose()
        .use(function (req, res, next) {
            if (req.headers.authorization) {
                validateJwt(req, res, next);
            }
            else {
                return res.status(500).send({
                    message: "No token provided."
                });
            }
        })
        .use(function (err, req, res, next) {
            if (!req.user) {
                return res.status(401).send({
                    message: "Invalid Token."
                });
            }
        });

        
}

// authentication 
exports.login = async (req, res) => {
    try {

        const cipher = crypto.createCipher('aes128', 'a password');
        var encryptedpassword = cipher.update(req.body.Password, 'utf8', 'hex');
        encryptedpassword += cipher.final('hex');


        var User = await db.User.findOne(
            {
                where: { Email: req.body.Email, Password: encryptedpassword, IsActive: 1 }
            });

        if (User) {
            const accessToken = jwt.sign({ id: User.id }, SECRET_KEY,
                {
                    expiresIn: '60m'
                });
            res.send({
                status: 1,
                data: User,
                message: "Login Success",
                Token: accessToken
            });
        } else {
            return res.status(200).send({
                status: 0,
                message: "Invalid Email or password !"
            });
        }


    }
    catch (error) {
        return res.status(500).send({
            message: "Error retrieving user with Email :" + req.body.Email + "...." + error
        });
    }
}

//registration
exports.register = (req, res) => {

    db.User.findOne({ where: { "Email": req.body.Email } })
        .then(object => {
            if (!object) {

                const cipher = crypto.createCipher('aes128', 'a password');
                var encryptedpassword = cipher.update(req.body.Password, 'utf8', 'hex');
                encryptedpassword += cipher.final('hex');

                req.body.Password = encryptedpassword;

                const object = req.body;

                db.User.create(object)
                    .then(data => {
                        data.update({
                            CreatedAt: new Date(),
                            CreatedBy: data.id
                        })
                        return res.status(200).send({
                            status: 1,
                            message: "Registration successfully complete."
                        });

                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating."
                        });
                    });


            }
            else {
                return res.status(200).send({
                    status: 0,
                    message: "User Already Exist! " + req.body.Email
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving user with Email :" + req.body.Email + "...." + err
            });
        });
}