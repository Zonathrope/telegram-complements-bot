import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    user_id: String,
    isActive: Boolean
})

const user = mongoose.model('User', UserSchema)

export default user