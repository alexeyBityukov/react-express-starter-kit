const mongoose = require('mongoose');

const init = function() {
    const User = require('./models/user');
    const ShippingAddress = require('./models/shippingAddress');

    const mainCommentatorShippingAddressData = {
        country: 'Россия',
        area: 'Мурманская область',
        city: 'город Мурманск',
        street: 'улица Ленина',
        house: 'дом 31',
        flat: 'квартира 10',
        postCode: '304567',
    };

    const mainCommentatorShippingAddress = new ShippingAddress({
        _id: new mongoose.Types.ObjectId(),
        ...mainCommentatorShippingAddressData
    });

    const mainCommentatorData = {
        name: {
            firstName: 'Ольга',
            lastName: 'Сетчина'
        },
        phone: '+79876543210',
        password: 'olgaPassword',
        login: 'olgaLogin',
    };

    const mainCommentator = new User({
        _id: new mongoose.Types.ObjectId(),
        ...mainCommentatorData,
        shippingAddress: mainCommentatorShippingAddress._id
    });

    mainCommentatorShippingAddress.user = mainCommentator._id;

    ShippingAddress.find(mainCommentatorShippingAddressData, function (err, doc) {
        if(doc.length === 0)
            mainCommentatorShippingAddress.save(errorHandler(saveMainCommentator));
        else
            saveMainCommentator();
    });

    function saveMainCommentator() {
        User.find(mainCommentatorData, function (err, doc) {
            if(doc.length === 0)
                mainCommentator.save(errorHandler(function(){console.log('Everything is ok!')}));
            else
                (function(){console.log('Everything is ok!')})();
        });
    }

    function errorHandler(callback) {
        return function (err) {
            if (err) throw err;
            callback();
        }
    }
};

module.exports = init;
