import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    user_id: String,
    isActive: Boolean
})

const user = mongoose.model('UserModel', UserSchema)

export default user