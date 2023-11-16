const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    agencyId: {
        type: String,
        required: [true, 'Agency is required'],
    },

    plateNumber: {
        type: String,
        required: [true, 'Bus plate number is required']
    },

    seatNumber: {
        type: Number,
        required: [true, 'Bus seat number is required']
    },

    busDriver: {
        type: String,
        required: [true, 'Bus driver is required']
    },

    routeFrom: {
        type: String,
        required: [true, 'Route from is required']
    },

    routeTo: {
        type: String,
        required: [true, 'Route to is required']
    },

    busPrice: {
        type: Number,
        required: [true, 'Bus price is required']
    },

    busDepartureTime: {
        type: String,
        required: [true, 'Bus departure time is required']
    },

    busDepartureDate: {
        type: Array || String,
        required: [true, 'Bus departure date is required']
    },

    bookedSeats: {
        type: Array,
        default: []
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamp: true})

module.exports = mongoose.model('Bus', busSchema)