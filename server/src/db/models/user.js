const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    phone: String,
    password: String,
    login: String,
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User ;
