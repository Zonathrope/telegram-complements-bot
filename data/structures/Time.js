import mongoose from 'mongoose'

const TimeSchema = new mongoose.Schema({
    time: String,
    user_id: String
})

const time = mongoose.model('TimeModel', TimeSchema)
module.exports = time