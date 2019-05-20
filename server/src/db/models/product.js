const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    count: Number,
    price: Number,
    name: String,
    image: String,
    description: String,
    characteristics: {
      color: String,
      sex: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductComment'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product ;
