import {Markup, Telegraf, Scenes, session} from 'telegraf'
import {readJson} from '../server/Util/Util.mjs'
import Database from '../server/Database/Database.js'
import ScenesGenerator from "./Scenes/SceneGenerator.js";


const data = await readJson('D:\\Projects\\telegram-complements-bot\\data\\config.json')

const bot = new Telegraf(data.key)

const generator = new ScenesGenerator(data.dbLink)
const menuScene = generator.menuGenerator()

const stage = new Scenes.Stage([menuScene])
bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => {
    const userName = ctx.update.message.from.first_name
    await ctx.reply(`Привет, ${userName}!`)
    await ctx.scene.enter('menu')
})

bot.command('/menu', async (ctx) => {
    await ctx.scene.enter('menu')
})


await bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
