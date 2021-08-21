import {Markup, Telegraf, Scenes, session} from 'telegraf'
import {msgWithDelay, readJson} from '../server/Util/Util.mjs'
import Database from '../server/Database/Database.js'
import ScenesGenerator from "./Scenes/SceneGenerator.js";


const data = await readJson('D:\\Projects\\telegram-complements-bot\\data\\config.json')
const bot = new Telegraf(data.key)
const db = new Database(data.dbLink)

const generator = new ScenesGenerator(db)
const menuScene = generator.menuGenerator()
const stage = new Scenes.Stage([menuScene])
bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => {
    const userName = ctx.update.message.from.first_name
    await ctx.reply(`Привет, ${userName}!`)
    await ctx.scene.enter('menu')
})

setInterval(async () => {
    const usersArray = await db.getAllActiveUsers()
    for (const user in usersArray) {
        await msgWithDelay(async () => {
            await bot.sendMessage(user.user_id, db.getRandomCompliment())
        })
    }
},1000 * 60 * 60 * 24)


bot.command('/menu', async (ctx) => {
    await ctx.scene.enter('menu')
})


await bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
