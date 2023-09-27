const mongoose = require('mongoose')

exports.connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}