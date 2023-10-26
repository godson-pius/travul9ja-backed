const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required']
    },

    bookingId: {
        type: String,
        required: [true, 'Booking ID is required']
    },

    price: {
        type: Number,
        required: [true, 'Price is required']
    },

    paymentDesc: {
        type: String,
        required: [true, 'Payment description is required']
    }

}, { timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema)