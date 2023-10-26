const Bus = require('../models/busModel')
const asyncHandler = require('express-async-handler')

exports.getAllBus = asyncHandler(async(req, res) => {
    try {
        const buses = await Bus.find()
        res.status(200).json({data: buses, success: true})
    } catch (error) {
        res.status(500).json({ error: error, success: false })
    }
})

exports.addBus = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(400)
            throw new Error('Failed to add bus')
        }

        

        const bus = await Bus.create(req.body)
        res.status(201).json({ data: bus, success: true })

    } catch (error) {
        res.status(500).json({ error: error, success: false })
    }
})

exports.getBus = asyncHandler(async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id)
        
        if (bus === null) {
            res.status(404)
            throw new Error('Bus not found')
        }

        res.status(200).json({ data: bus, success: true })
    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
})

exports.getAgencyBus = asyncHandler(async (req, res) => {
    try {
        const buses = await Bus.find({ agencyId: req.params.id })
        res.status(200).json({data: buses, success: true})
    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
})