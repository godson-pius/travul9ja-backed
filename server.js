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
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)


// APPLICATION PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})