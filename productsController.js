'use strict';


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.list_all_products = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("productsList");
        dbo.collection("productsList").find().toArray(function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
            db.close();
        });
    });
};

exports.read_a_product = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("productsList");
        dbo.collection("productsList").find({'sku': req.query.id}).toArray(function(err, result) {
            //console.log(result, req.query.id);
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
            db.close();
        });
    });
};

exports.create_user = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("productsList");
        dbo.collection("commUsers").find({'emailId': req.body.emailId}).toArray(function(err, result) {
            console.log(result);
            if (err) {
                res.send(err);
            } else {
                if (result.length == 0 ) {
                    dbo.collection("commUsers").insert(req.body, function(err, result) {
                        //console.log(result, req.query.id);
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(result);
                        }
                        db.close();
                    });
                }else{
                    res.json({'status': 0, message: 'User already Registered..'});
                }
            }
            db.close();
        });

    });
};

exports.read_a_user = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("productsList");
        dbo.collection("commUsers").findOne({'emailId': req.body.emailId}, function(err, result) {
            console.log(result, req.body);
            if (err) {
                res.send(err);
            } else {
                if (!result) {
                    res.json({'status': 0, message: 'User not found.. Please sign up and try again..'});
                } else if (result.password == req.body.password) {
                    res.json({'status': 1});
                } else {
                    res.json({'status': 0, message: 'Password Mismatch..'});
                }
            }
            db.close();
        });
    });
};