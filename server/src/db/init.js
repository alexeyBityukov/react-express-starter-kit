const mongoose = require('mongoose');

const adidasDuramo9KImage = require('../../static/img/adidasDuramo9K');
const botVitacciImage = require('../../static/img/botVitacci');
const taccardiImage = require('../../static/img/taccardi');
const twoeiImage = require('../../static/img/twoe');
const dinoRicciImage = require('../../static/img/dinoRicciImage');

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

    const adidasDuramo9KData = {
        count: 10,
        price: 5000,
        name: 'Кроссовки adidas DURAMO 9 K',
        image: adidasDuramo9KImage,
        description: 'Цвет: черный, Российский размер (обуви): 31, Европейский: 32',
        characteristics: {
            color: 'черный',
            sex: 'мужчина'
        }
    };

    const adidasDuramo9K = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...adidasDuramo9KData,
        comments: [],
    });

    const botVitacciData = {
        count: 10,
        price: 5290,
        name: 'Ботильоны Vitacci',
        image: botVitacciImage,
        description: 'Цвет: бордовый, Российский размер (обуви): 35',
        characteristics: {
            color: 'бордовый',
            sex: 'женщина'
        }
    };

    const botVitacci = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...botVitacciData,
        comments: [],
    });

    const TACCARDIData = {
        count: 11,
        price: 1500,
        name: 'Босоножки T.TACCARDI',
        image: taccardiImage,
        description: 'Цвет: черный, Российский размер (обуви): 38',
        characteristics: {
            color: 'черный',
            sex: 'женщина'
        }
    };

    const TACCARDI = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...TACCARDIData,
        comments: [],
    });

    const crossTvoeData = {
        count: 12,
        price: 3545,
        name: 'Кроссовки Superdry',
        image: twoeiImage,
        description: 'Цвет: белый, Российский размер (обуви): 38',
        characteristics: {
            color: 'белый',
            sex: 'женщина'
        }
    };

    const crossTvoe = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...crossTvoeData,
        comments: [],
    });

    const DinoRicciData = {
        count: 13,
        price: 1180,
        name: 'Туфли Dino Ricci Select',
        image: dinoRicciImage,
        description: 'Цвет: черный, Российский размер (обуви): 37',
        characteristics: {
            color: 'черный',
            sex: 'женщина'
        }
    };

    const DinoRicci = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...DinoRicciData,
        comments: [],
    });

    const adidasDuramo9KCommentData = {
        message: 'Крутые кроссовки! Сыну понравились)',
    };

    const adidasDuramo9KComment = new ProductComment({
        _id: new mongoose.Types.ObjectId(),
        user: mainCommentator._id,
        ...adidasDuramo9KCommentData,
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

    Product.find(botVitacciData, function (err, doc) {
        if(doc.length === 0)
            botVitacci.save();
    });

    Product.find(TACCARDIData, function (err, doc) {
        if(doc.length === 0)
            TACCARDI.save();
    });

    Product.find(crossTvoeData, function (err, doc) {
        if(doc.length === 0)
            crossTvoe.save();
    });

    Product.find(DinoRicciData, function (err, doc) {
        if(doc.length === 0)
            DinoRicci.save();
    });

    Product.find(adidasDuramo9KData, function (err, doc) {
        if(doc.length === 0) {
            adidasDuramo9K.save();
            mainCommentatorOrder.save(errorHandler(initComplete));
        }
    });


    function saveMainCommentator() {
        User.find(mainCommentatorData, function (err, doc) {
            if (doc.length === 0)
                mainCommentator.save();
        });
    }

    ProductComment.find(adidasDuramo9KCommentData, function (err, doc) {
        if (doc.length === 0) {
            adidasDuramo9KComment.save();
        }
    });


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
