const AgencyModel = require('../models/agencyModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/token');

/**
 * FUNCTION TO GET ALL AGENCIES
 * @method GET
 * @api public (api/v1/agency)
 */
exports.getAgencies = asyncHandler(async (req, res) => {
    const users = await AgencyModel.find({});
    res.status(200).json(users)
})

/**
 * FUNCTION TO CREATE AGENCY
 * @method POST
 * @api public (api/v1/agency)
 */
exports.createAgency = asyncHandler(async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.agencyPassword, 10)
        const userData = {...req.body, agencyPassword: hashPassword}

        // CHECK IF THERE IS DATA TO CREATE
        if (!req.body) {
            res.status(400)
            throw new Error("Failed to create user")
        }

        // CREATE USER
        const user = await AgencyModel.create(userData)
        res.status(201).json({data: user, success: true})
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

/**
 * FUNCTION TO GET SINGLE AGENCY
 * @method GET
 * @api public (api/v1/agency/:id)
 */
exports.getAgency = asyncHandler(async(req, res) => {
    // GET USER BY ID
    const agency = await AgencyModel.findById(req.params.id)

    // CHECK IF Agency EXISTS IN DATABASE
    if (agency == null) {
        res.status(404)
        throw new Error("Agency not found!")
    }

    res.status(200).json({data: agency, success: true})
})

/**
 * FUNCTION TO UPDATE AGENCY
 * @method PUT
 * @api public (api/v1/agency/:id)
 */
exports.updateAgency = asyncHandler(async(req, res) => {
    // GET USER BY ID
    const user = await AgencyModel.findById(req.params.id)

    // CHECK IF AGENCY EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("Agency not found!")
    }

    const updatedAgency = await AgencyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedAgency)
})

/**
 * FUNCTION TO DELETE AGENCY
 * @method DELETE
 * @api public (api/v1/agency/:id)
 */
exports.deleteAgency = asyncHandler(async(req, res) => {
    // GET AGENCY BY ID
    const agency = await AgencyModel.findById(req.params.id)

    // CHECK IF AGENCY EXISTS IN DATABASE
    if (agency == null) {
        res.status(404)
        throw new Error("Agency not found!")
    }

    const agencyToDelete = await AgencyModel.findByIdAndDelete(req.params.id)
    res.status(200).json({data: agencyToDelete, success: true})
})

/**
 * FUNCTION TO LOGIN
 * @method POST
 * @api public (api/v1/agency/login)
 */
exports.login = asyncHandler(async(req, res) => {

    console.log(req.body);
    const { agencyEmail, agencyPassword } = req.body

    const agency = await AgencyModel.findOne({ agencyEmail })

    if (agency == null) {
        res.status(404)
        throw new Error("Agency not found!")
    }

    const isMatch = await bcrypt.compare(agencyPassword, agency.agencyPassword)
    if (!isMatch) {
        res.status(400)
        throw new Error("Invalid credentials!")
    }

    // console.log(agency._id);
    // return

    const token = createToken(agency._id)
    res.status(200).json({ token, data: agency, success: true })

})