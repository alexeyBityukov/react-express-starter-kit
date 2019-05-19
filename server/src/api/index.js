const apiPath = '/api';



module.exports = function(app) {
    app.get(`${apiPath}/*`,function(req,res,next){
        res.header('Access-Control-Allow-Origin' , 'http://localhost:3000' );
        res.header('Access-Control-Allow-Origin' , 'http://localhost:5000' );
        next(); // http://expressjs.com/guide.html#passing-route control
    });

    app.get(`${apiPath}/users`, function (req, res) {
        const User = require('../db/models/user');
        User.find({}).exec(function(err, users) {
            if (err) throw err;
            res.send(users);
        });
    });
};
