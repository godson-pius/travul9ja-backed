const Payment = require('../models/paymentModel')
const asyncHandler = require('express-async-handler')

/**
 * @method get
 * url /api/v1/payment
 */

exports.getAllPayment = asyncHandler(async(req, res) => {
    try {
        const payments = await Payment.find()
        res.status(200).json({ data: payments, success: true })
    } catch (error) {
        res.status(500).json({error})
    }
})

/**
 * @method get
 * url /api/v1/payment/{id}
 */

exports.getSinglePayment = asyncHandler(async(req, res) => {
    try {
        const paymentId = req.params.id

        const payment = await Payment.findById(paymentId)
        
        if (payment === null) {
            res.status(404)
            throw new Error('No payment found!')
        }

        res.status(200).json({ data: payment, success: true })
    } catch (error) {
        res.status(500).json({error: error})
    }
})

/**
 * @method get
 * url /api/v1/payment/user/{userId}
 */

exports.getUserPayment = asyncHandler(async(req, res) => {
    try {
        const userId = req.params.userId

        const payment = await Payment.findOne({ userId })
       
        if (payment == null) {
            res.status(400).json({ data: 'No payment(s) found!', success: false })
        }

        res.status(200).json({ data: payment, success: true })
    } catch (error) {
        res.status(500).json({error: error})
    }
})

/**
 * @method post
 * url /api/v1/payment
 */
exports.makePayment = asyncHandler(async(req, res) => {
    try {
        const paymentRequest = req.body
        if (!paymentRequest) {
            res.status(400)
            throw new Error("Failed to make payment!")
        }

        const payment = await Payment.create(paymentRequest)
        res.status(201).json({ data: payment, success: true })
    } catch (error) {
        res.status(500).json({error: error})
    }   
})