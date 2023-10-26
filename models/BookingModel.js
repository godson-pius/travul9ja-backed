const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User is required"]
    },

    busId: {
        type: String,
        required: [true, "Booked bus is required"]
    },

    travelDate: {
        type: String,
        required: [true, "Travel date is required"]
    },

    adults: {
        type: Number,
        required: [true, "Number of adult is required"]
    },

    bookedSeat: {
        type: Array || String,
        default: []
    },

    routeFrom: {
        type: String,
        required: [true, "Route from is required"]
    },

    routeTo: {
        type: String,
        required: [true, "Route to is required"]
    }

}, { timestamps: true })

module.exports = mongoose.model("Booking",  bookingSchema)