const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/alena-site', function (err) {
    if (err) throw err;
});

const User = require('./db/models/user');
const ShippingAddress = require('./db/models/shippingAddress');
const Product = require('./db/models/product');
const ProductComment = require('./db/models/productComment');
const Order = require('./db/models/order');

const alex = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
        firstName: 'Alex',
        lastName: 'Test'
    },
    phone: '+7 (951) 328-51-13',
    password: 'axelt',
});

alex.save(function(err) {
    if (err) throw err;

    console.log('Alex successfully saved.');
});

// const jamieAuthor = new Author({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//         firstName: 'Jamie',
//         lastName: 'Munro'
//     },
//     biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
//     twitter: 'https://twitter.com/endyourif',
//     facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
// });
//
// jamieAuthor.save(function(err) {
//     if (err) throw err;
//
//     console.log('Author successfully saved.');
//
//     const mvcBook = new Book({
//         _id: new mongoose.Types.ObjectId(),
//             title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
//             author: jamieAuthor._id,
//             ratings:[{
//             summary: 'Great read'
//         }]
//     });
//
//     mvcBook.save(function(err) {
//         if (err) throw err;
//
//         console.log('Book successfully saved.');
//     });
//
//     const knockoutBook = new Book({
//         _id: new mongoose.Types.ObjectId(),
//             title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
//             author: jamieAuthor._id
//     });
//
//     knockoutBook.save(function(err) {
//         if (err) throw err;
//
//         console.log('Book successfully saved.');
//     });
// });