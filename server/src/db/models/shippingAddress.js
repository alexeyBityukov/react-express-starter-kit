const mongoose = require('mongoose');

const shippingAddressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    country: String,
    area: String,
    city: String,
    street: String,
    house: String,
    flat: String,
    postCode: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);

module.exports = ShippingAddress ;
