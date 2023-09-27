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

    password: {
        type: String,
        required: [true, "Password is required"]
    }
    
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)