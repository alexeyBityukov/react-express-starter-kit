const apiPath = '/api';



module.exports = function(app) {
    app.get(`${apiPath}/*`,function(req, res, next){
        if(req.headers.origin === 'http://localhost:3000' || req.headers.origin === 'http://localhost:5000')
            res.set('Access-Control-Allow-Origin' , req.headers.origin );
        next();
    });

    app.get(`${apiPath}/users`, function (req, res) {
        const User = require('../db/models/user');
        User.find({}).exec(function(err, users) {
            if (err) throw err;
            res.send(users);
        });
    });

    app.get(`${apiPath}/user`, function (req, res) {
        const User = require('../db/models/user');
        User.findOne({_id: req.query.id}).exec(function(err, user) {
            if (err) throw err;
            res.send(user);
        });
    });

    app.get(`${apiPath}/products`, function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const Product = require('../db/models/product');
        Product.find({}).exec(function(err, products) {
            if (err) throw err;
            res.send(products);
        });
    });

    app.get(`${apiPath}/product`, function (req, res) {
        const Product = require('../db/models/product');
        Product.findOne({_id: req.query.id}).exec(function(err, product) {
            if (err) throw err;
            res.send(product);
        });
    });
};
