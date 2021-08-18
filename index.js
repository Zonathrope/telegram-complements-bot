import {Markup, Telegraf} from 'telegraf'
import {readJson, writeJson} from './server/Util/Util.mjs'


// readJson('bot-api.json').then(data => main(data.key))
//
// function main(key) {
//     const bot = new Telegraf(key)
//
//     bot.start((ctx) => ctx.reply(`Привет, ${ctx.update.message.from.first_name}!`))
//
//     bot.command('/menu', async (ctx) => {
//         return await ctx.reply("Меню:", Markup
//             .keyboard([
//                 ['Включить', 'Выключить'], // Row1 with 2 buttons
//                 ['Изменить время'], // Row2 with 2 buttons
//                 ['Связаться с создателем', 'Поддержать'] // Row3 with 3 buttons
//             ])
//             .resize()
//         )
//     })
//
//     bot.hears('Включить', async (ctx) =>{
//         return await ctx.reply('Включен!')
//     })
//
//     bot.launch().then()
//
// // Enable graceful stop
//     process.once('SIGINT', () => bot.stop('SIGINT'))
//     process.once('SIGTERM', () => bot.stop('SIGTERM'))
// }
