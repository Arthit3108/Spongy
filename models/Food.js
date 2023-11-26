const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema ({
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
    clearTime : {
        type: String,
    }


}, {
    timestamps: true
});


const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;