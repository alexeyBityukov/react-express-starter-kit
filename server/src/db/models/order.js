const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        count: Number,
    }],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress',
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;