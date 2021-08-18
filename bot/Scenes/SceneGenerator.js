import {Markup, Scenes} from 'telegraf'
import Database from "../../server/Database/Database.js";

export default class ScenesGenerator {
    constructor(dbLink) {
        this.db = new Database(dbLink)
    }
    menuGenerator() {
        const menu = new Scenes.BaseScene("menu")

        menu.enter(async (ctx) => {
            const userTg_id = ctx.update.message.from.id
            if(await this.db.getUser(`${userTg_id}`) === null){
                await this.db.addUser(`${userTg_id}`)
                await ctx.reply("Вы были добавлены в базу")
            }
            const isTurned = (await this.db.getUser(`${userTg_id}`)).isActive
                ? 'Выключить'
                : 'Включить'
            await ctx.reply('text', Markup
                .keyboard([
                    [`${isTurned}`],
                    ['Моментальная помощь'],
                    ['Связаться с создателем', 'Поддержать']
                ])
                .resize()
            )
        })

        menu.hears('Связаться с создателем', async (ctx) => {
            await ctx.replyWithContact("+380984713688", 'Alex')
        })

        menu.hears('Включить', async (ctx) => {
            const userTg_id = ctx.update.message.from.id
            await this.db.setUserActive(`${userTg_id}`,true)
            await ctx.reply('бот включён!')
            await ctx.scene.reenter()
        })

        menu.hears('Выключить', async (ctx) => {
            const userTg_id = ctx.update.message.from.id
            await this.db.setUserActive(`${userTg_id}`,false)
            await ctx.reply('бот выключён!')
            await ctx.scene.reenter()
        })
        return menu
    }
}