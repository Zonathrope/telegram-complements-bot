import {MongoClient} from 'mongodb'
import fs from 'fs'

class Database {
    client;
    constructor(link) {
        this.client = new MongoClient(link)
    }

    async addUser(data) {
        console.log(this.client.db().collection('users').find())
        try {
            await this.client.db().collection('users').insertOne(data)
        } catch (e) {
            console.error(e)
        }
    }

    async isUserActive(userID) {
        try {
            const user = await this.client.db().collection('users').findOne({user_id: userID})
            return user.isActive
        } catch (e) {
            console.error(e)
        }
    }

    async changeUserTime(userID, arrayOfTime) {
        try {
            const json = await this.client.db().collection('time')
        } catch (e) {
            console.log(e)
        }
    }

    async insertTime(userID, newTime) {
        if (Array.isArray(newTime)) {
            const arrayOfTime = []
            for (let i = 0; i < newTime.length; i++) {
                arrayOfTime.push({user_id: userID, time: newTime[i]})
            }
            await this.client.db().collection('time').insertMany(arrayOfTime);
        } else {
            await this.client.db().collection('time').insertOne({user_id: userID, time: newTime});
        }
    }

    async getTime(time) {
        return this.client.db().collection('time').find({time: time});
    }
}
const string = fs.readFileSync('url.txt').toString()
const db = new Database(string)
console.log(db.addUser({user_id: 555, isActive:true}))