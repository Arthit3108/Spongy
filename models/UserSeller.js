const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSellerSchema = new mongoose.Schema ({
    storename : {
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
            required: false
          },
          coordinates: {
            type: [Number], // เก็บพิกัดเป็น [longitude, latitude]
            index: '2dsphere' // สร้างดัชนีสำหรับการค้นหาใน 2D Sphere
          }
    },
    review: [
        {
            reviewer : {
                type: mongoose.Schema.Types.ObjectId
            },
            starts: Number,
            commentAt : {
                type: Date,
                required: true
            }
        }
    ],
    avgRating : {
        type: Object,
        default: 0
    }

}, {
    timestamps: true
});

// codify before save in database
UserSellerSchema.pre('save', function(next) {
    const user = this // this mean UserSellerSchema

    // codify hash 10 times
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error);
    })
})

const UserSeller = mongoose.model('UserSeller', UserSellerSchema);
module.exports = UserSeller;