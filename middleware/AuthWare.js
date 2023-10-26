require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.AuthWare = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.TRAVEL_SECRET)

        req.user = user
        next()

    } catch (error) {
        res.status(403)
        throw new Error("Access forbidden!")
    }
}