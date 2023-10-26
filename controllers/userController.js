const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const { createToken } = require('../utils/token');

/**
 * FUNCTION TO GET ALL USERS
 * @method GET
 * @api public (api/users)
 */
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users)
})

/**
 * FUNCTION TO CREATE USER
 * @method POST
 * @api public (api/users)
 */
exports.createUser = asyncHandler(async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body

        // CHECK IF THERE IS DATA TO CREATE
        if (!req.body) {
            res.status(400)
            throw new Error("Failed to create user")
        }

        // CHECK IF USER EXISTS IN DATABASE
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            res.status(400);
            throw new Error("User already exists")
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10)
        // CREATE USER
        const user = await User.create({ fullname, email, phone, password: hashedPassword })
        res.status(200).json({ data: user, success: true })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * FUNCTION TO GET SINGLE USER
 * @method GET
 * @api public (api/users/:id)
 */
exports.getUser = asyncHandler(async (req, res) => {
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
exports.updateUser = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.params.id)

    // CHECK IF USER EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("User not found!")
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ data: updatedUser, success: true })
})

/**
 * FUNCTION TO DELETE USER
 * @method DELETE
 * @api public (api/users/:id)
 */
exports.deleteUser = asyncHandler(async (req, res) => {
    // GET USER BY ID
    const user = await User.findById(req.params.id)

    // CHECK IF USER EXISTS IN DATABASE
    if (user == null) {
        res.status(404)
        throw new Error("User not found!")
    }

    const userToDelete = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ data: userToDelete, success: true })
})

/**
 * FUNCTION TO LOGIN
 * @method POST
 * @api public (api/v1/user/login)
 */
exports.login = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user == null) {
            res.status(404)
            throw new Error("User not found!")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400)
            throw new Error("Invalid credentials!")
        }

        const token = createToken(user._id)
        res.status(200).json({ token, data: user, success: true })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})