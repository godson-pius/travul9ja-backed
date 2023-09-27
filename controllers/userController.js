const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

/**
 * FUNCTION TO GET ALL USERS
 * @method GET
 * @api public (api/users)
 */
exports.getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.status(200).json(users)
})

/**
 * FUNCTION TO CREATE USER
 * @method POST
 * @api public (api/users)
 */
exports.createUser = asyncHandler(async(req, res) => {
    const { fullname, email, password } = req.body

    // CHECK IF THERE IS DATA TO CREATE
    if (!req.body) {
        res.status(400)
        throw new Error("Failed to create user")
    }

    // CHECK IF USER EXISTS IN DATABASE
    const checkUser = await User.find({ email })
    if (checkUser) {
        res.status(400);
        throw new Error("User already exists")
    }

    // CREATE USER
    const user = await User.create(req.body)
    res.status(200).json(user)
})

/**
 * FUNCTION TO GET SINGLE USER
 * @method GET
 * @api public (api/users/:id)
 */
exports.getUser = asyncHandler(async(req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.params.id)

    // CHECK IF USER EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("User not found!")
    }

    res.status(200).json(user)
})

/**
 * FUNCTION TO UPDATE USER
 * @method PUT
 * @api public (api/users/:id)
 */
exports.updateUser = asyncHandler(async(req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.params.id)

    // CHECK IF USER EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("User not found!")
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedUser)
})

/**
 * FUNCTION TO UPDATE USER
 * @method PUT
 * @api public (api/users/:id)
 */
exports.updateUser = asyncHandler(async(req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.params.id)

    // CHECK IF USER EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("User not found!")
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedUser)
})

/**
 * FUNCTION TO DELETE USER
 * @method DELETE
 * @api public (api/users/:id)
 */
exports.deleteUser = asyncHandler(async(req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.params.id)

    // CHECK IF USER EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("User not found!")
    }

    const userToDelete = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(userToDelete)
})