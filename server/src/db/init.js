const mongoose = require('mongoose');

const adidasDuramo9KImage = require('../../static/img/adidasDuramo9K');

const User = require('./models/user');
const ShippingAddress = require('./models/shippingAddress');
const Product = require('./models/product');
const ProductComment = require('./models/productComment');
const Order = require('./models/order');

const init = function() {

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

    const adidasDuramo9K = new Product({
        _id: new mongoose.Types.ObjectId(),
        count: 10,
        price: 5000,
        name: 'Кроссовки adidas DURAMO 9 K',
        image: adidasDuramo9KImage,
        description: 'Цвет: черный, Российский размер (обуви): 31, Европейский: 32',
        characteristics: {
            color: 'черный',
        },
        comments: [],
    });

    const adidasDuramo9KComment = new ProductComment({
        _id: new mongoose.Types.ObjectId(),
        user: mainCommentator._id,
        message: 'Крутые кроссовки! Сыну понравились)',
        product: adidasDuramo9K._id,
    });

    const mainCommentatorOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: mainCommentator._id,
        products: [{
            product: adidasDuramo9K._id,
            count: 1,
        }],
        shippingAddress: mainCommentatorShippingAddress._id,
    });

    adidasDuramo9K.comments.push(adidasDuramo9KComment._id);

    ShippingAddress.find(mainCommentatorShippingAddressData, function (err, doc) {
        if(doc.length === 0)
            mainCommentatorShippingAddress.save(errorHandler(saveMainCommentator));
        else
            saveMainCommentator();
    });

    function saveMainCommentator() {
        User.find(mainCommentatorData, function (err, doc) {
            if (doc.length === 0)
                mainCommentator.save(errorHandler(saveAdidasDuramo9K));
            else
                saveAdidasDuramo9K();
        });
    }

    function saveAdidasDuramo9K() {
        adidasDuramo9K.save(errorHandler(saveAdidasDuramo9KComment))
    }

    function saveAdidasDuramo9KComment() {
        adidasDuramo9KComment.save(errorHandler(saveMainCommentatorOrder));
    }

    function saveMainCommentatorOrder() {
        mainCommentatorOrder.save(errorHandler(initComplete))
    }

    function initComplete() {
        console.log('Db init complete!');
    }

    function errorHandler(callback) {
        return function (err) {
            if (err) throw err;
            callback();
        }
    }
};

module.exports = init;
