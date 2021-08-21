import mongoose from 'mongoose'

//TODO: create simple bot to add new compliments
const ComplimentSchema = new mongoose.Schema({
    compliment_id: String,
    text: String
})

const compliment = mongoose.model('Compliment', ComplimentSchema)

export default compliment