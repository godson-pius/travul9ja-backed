require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.createToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.TRAVEL_SECRET, { expiresIn: '1h' })
    return token
}