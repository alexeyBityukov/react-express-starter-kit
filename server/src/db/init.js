const mongoose = require('mongoose');

const init = function() {
    const User = require('./models/user');
    const ShippingAddress = require('./models/shippingAddress');

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

    mainCommentatorShippingAddress.user = mainCommentator._id;

    mainCommentatorShippingAddress.save(errorHandler(saveMainCommentator));

    function saveMainCommentator() {
        mainCommentator.save(errorHandler(function(){console.log('Everything is ok!')}));
    }

    function errorHandler(callback) {
        return function (err) {
            if (err) throw err;
            callback();
        }
    }
};

module.exports = init;
