const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/alena-site', function (err) {
    if (err) throw err;
});

const init = require('./db/init.js');

init();
