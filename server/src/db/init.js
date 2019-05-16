const mongoose = require('mongoose');

const init = function() {
    const User = require('./models/user');
    const ShippingAddress = require('./models/shippingAddress');
    const Product = require('./models/product');
    const ProductComment = require('./models/productComment');
    const Order = require('./models/order');

    const mainCommentatorShippingAddress = new ShippingAddress({
        _id: new mongoose.Types.ObjectId(),
        country: 'Россия',
        area: 'Мурманская область',
        city: 'город Мурманск',
        street: 'улица Ленина',
        house: 'дом 31',
        flat: 'квартира 10',
        postCode: '304567',
    });

    const mainCommentator = new User({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: 'Ольга',
            lastName: 'Сетчина'
        },
        phone: '+79876543210',
        password: 'olgaPassword',
        login: 'olgaLogin',
        shippingAddress: mainCommentatorShippingAddress._id
    });

    mainCommentatorShippingAddress.save(errorHandler(saveMainCommentator));

    function saveMainCommentator() {
        mainCommentator.save(errorHandler(updateMainCommentatorShippingAddress));
    }

    function updateMainCommentatorShippingAddress() {
        mainCommentatorShippingAddress.user = mainCommentator._id;
        mainCommentatorShippingAddress.save(errorHandler(function(){console.log('Everything is ok!')}));
    }

    function errorHandler(callback) {
        return function (err) {
            if (err) throw err;
            callback();
        }
    }
};

module.exports = init;
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