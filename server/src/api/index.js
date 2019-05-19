const apiPath = '/api';



module.exports = function(app) {
    app.get(`${apiPath}/*`,function(req, res, next){
        console.log(req.headers.origin);
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
};
