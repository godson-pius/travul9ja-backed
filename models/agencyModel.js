const mongoose = require('mongoose')

const agencySchema = mongoose.Schema({
    agencyName: { 
        type: String,
        unique: true,
        required: [true, 'Agency name is required']
     },

     agencyEmail: {
        type: String,
        unique: true,
        required: [true, 'Agency email is required']
     },

     agencyPhone: {
      type: String,
      required: [true, 'Agency phone number is required']
     },

     agencyPassword: {
      type: String,
      required: [true, 'Agency password is required']
     },

     agencyAddress: {
        type: String,
        required: [true, 'Agency address is required']
     },

     agencyApi: {
        type: String,
        unique: true,
        default: 'null'
     }
}, { timestamps: true })

const AgencyModel = mongoose.model('Agency', agencySchema)
module.exports = AgencyModel