var express = require('express'),
        app = express(),
        port = process.env.PORT || 3000,
        bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

var products = require('./productsController');
app.route('/products').get(products.list_all_products);
app.route('/product').get(products.read_a_product);
app.route('/createuser').post(products.create_user);
app.route('/login').post(products.read_a_user);


app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
