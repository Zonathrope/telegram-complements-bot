import mongoose from 'mongoose'

const TimeSchema = new mongoose.Schema({
    time: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const time = mongoose.model('Time', TimeSchema)

export default time