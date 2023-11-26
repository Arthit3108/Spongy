const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema ({
    foodname : {
        type: String,
        require: true,
    },
    storename : {
        type: String,
        require: true,
    },
    discountedPrice : {
        type: Number,
        require: true,
    },
    category : {
        type: String,
        require: true,
    },
    stock : {
        type: Number,
        require: true
    },
    normalPrice : { 
        type: Number,
        require: true,
    },
    sold : {
        type: Number,
        default: 0,
    },
    imageProduct : {
        type: String,
    },
    exp : {
        type: String,   
        require: true,
    },
    clearTime : {
        type: String,
        require: true,
    },


}, {
    timestamps: true
});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;