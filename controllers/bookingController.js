const Booking =  require('../models/BookingModel')
const Bus = require('../models/busModel')
const asyncHandler = require('express-async-handler')

exports.bookBus = asyncHandler(async(req, res) => {
    try {
        const { busId, userId, travelDate, bookedSeat } = req.body

        const bookedBus = await Bus.findById(busId)

        if (bookedBus == null) {
            res.status(404)
            throw new Error('No bus found!')
        }
        
        // Check to see if bus is filled up or not
        if (bookedBus.bookedSeats.length > bookedBus.seatNumber) {
            // Change the bus availability to false
            await Bus.findByIdAndUpdate(busId, { $push: { isAvailable: false} }, {new: true})

            res.status(400)
            throw new Error('Bus is already filled!')
        }

        // Check if user has booked journey before now
        const checkDuplicate = await Booking.findOne({ ...req.body })

        if (checkDuplicate) {
            res.status(400).json({ data: 'Journey already booked before! Please check your dashboard', success: true })
            return
        }

        const bookedDetails = await Booking.create(req.body)

         // Update the bus booked seats depending on the booking travel date
         const busUpdated = await Bus.findByIdAndUpdate(busId, { $push: { bookedSeats: bookedSeat} }, {new: true})

        res.status(201).json({ data: bookedDetails, success: true })

    } catch (error) {
        res.status(500).json({ error })
    }
})

/**
 * @method get
 * @url /api/v1/booking
 */
exports.getBookings = asyncHandler(async(req, res) => {
    try {
        const bookings = await Booking.find()
        res.status(200).json({ data: bookings, success: true })
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

/**
 * @method delete
 * @url /api/v1/booking/{id}
 */
exports.deleteBooking = asyncHandler(async(req, res) => {
    try {
        const bookingId = req.params.id

        const booking = await Booking.findById(bookingId)
        if (booking == null) {
            res.status(404)
            throw new Error(`Booking with id: ${bookingId} is not found!`)
        }

        const deletedBooking = await Booking.findByIdAndDelete(bookingId)
        
        res.status(200).json({ data: deletedBooking, success: true })
    } catch (error) {
        res.status(500).json({ error: error})
    }
})