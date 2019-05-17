const apiPath = '/api';

module.exports = function(app) {
    app.get(`${apiPath}/users`, function (req, res) {
        const User = require('../db/models/user');
        User.find({}).exec(function(err, users) {
            if (err) throw err;
            res.send(users);
        });
    });
};
