const mongoose = require('mongoose');
console.log('Trying to  connect to DB');

mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {

    if (err) throw err;

    console.log('Successfully connected to DB');

});