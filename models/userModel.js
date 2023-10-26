const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    }

    // Digital Wallet.
    
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)