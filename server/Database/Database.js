import mongoose from "mongoose";
import User from './structures/User.js'
import Time from './structures/Time.js'

export default class Database {
    constructor(link) {
        mongoose.connect(link)
            .then(() => console.log('Connected'))
            .catch(e => console.error(e))
        this.time_schema = Time
        this.user_schema = User
    }

    //adding new User to UserSchema
    //user_id - string, isActive?: boolean
    async addUser(userID, isActive = true) {
        try {
            await this.user_schema.create({
                user_id: userID,
                isActive
            })
        } catch (e) {
            console.error(e)
        }
    }

    async getUser(userID) {
        try {
            return this.user_schema.findOne({user_id: userID})
        } catch (e) {
            console.error(e)
        }
        return null
    }

    async setUserActive(userID, active) {
        try {
            await this.user_schema.updateOne({user_id: userID}, {isActive: active})
        } catch (e) {
            console.error(e)
        }
    }

    // taking userID:string, and newTime:Array<string>|string
    async changeUserTime(userID, newTime) {
        try {
            const user = await this.getUser(userID)
            await this.time_schema.deleteMany({user: user._id})
            await this.insertNewUserTime(user, newTime)
        } catch (e) {
            console.error(e)
        }
    }

    // taking userID:string, and newTime:Array<string>|string
    async insertNewUserTime(user, newTime) {
        if (Array.isArray(newTime)) {
            const arrayOfTime = []
            for (let i = 0; i < newTime.length; i++) {
                arrayOfTime.push({user: user._id, time: newTime[i]})
            }
            await this.time_schema.create(arrayOfTime);
        } else {
            await this.time_schema.create({user: user._id, time: newTime});
        }
    }

    // time:string return array of ID of active users
    async getUsersOnCurrentTime(time) {
        const arr = await this.time_schema
            .find({time: time})
            .populate({
                path: "user",
                model: "User",
                select: 'user_id isActive',
                match: {isActive: true}
            })
            .exec()

        return arr
            .filter(obj => obj.user?.user_id)
            .map(obj => obj.user.user_id)
    }
}

