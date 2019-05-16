const mongoose = require('mongoose');

const productCommentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const ProductComment = mongoose.model('ProductComment', productCommentSchema);

module.exports = ProductComment;