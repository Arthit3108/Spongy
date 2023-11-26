const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserBuyerSchema = new mongoose.Schema ({
    fullname : {
        type: String,
        require: true,
        unique: true
    },
    tel : {
        type: Number,
        require: true,
        unique: true
    },
    email : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    location : {
        type: {
            type: String,
            enum: ['Point'], // ประเภทต้องเป็น "Point"
            required: true
          },
          coordinates: {
            type: [Number], // เก็บพิกัดเป็น [longitude, latitude]
            index: '2dsphere' // สร้างดัชนีสำหรับการค้นหาใน 2D Sphere
          }
    },
    cart : [
        {
            product : {
                type: mongoose.Schema.Types.ObjectId
            },
            quantity : {
                type: Number,
                default: 1
            }
        }
    ]

}, {
    timestamps: true
});

// codify before save in database
UserBuyerSchema.pre('save', function(next) {
    const user = this // this mean UserBuyerSchema

    // codify hash 10 times
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error);
    })
})

const UserBuyer = mongoose.model('UserBuyer', UserBuyerSchema);
module.exports = UserBuyer;