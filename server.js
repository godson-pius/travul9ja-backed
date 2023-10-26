require('dotenv').config()
const express = require('express')
const { connectDb } = require('./config/connect')
const { errorHandler } = require('./middleware/errorHandler')
const app = express()

const port = process.env.PORT || 8080


// ESTABLISH DATABASE CONNECTION
connectDb();

// MIDDLEWARES
app.use(express.json())
app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/agency', require('./routes/agencyRoutes'))
app.use('/api/v1/bus', require('./routes/busRoutes'))
app.use('/api/v1/booking', require('./routes/bookingRoutes'))
app.use('/api/v1/payment', require('./routes/paymentRoutes'))
app.use(errorHandler)


// APPLICATION PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})