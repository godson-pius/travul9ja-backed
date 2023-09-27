const { codeDef } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500

    codeDef.map((e) => {
        if (e.code == statusCode) {
            res.json({ title: e.title, message: err.message, stackTrace: err.stack })
        }
    })
}

module.exports = { errorHandler }