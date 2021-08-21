import {Markup, Scenes} from 'telegraf'
import {msgWithDelay, randomNumb} from "../../server/Util/Util.mjs";

export default class ScenesGenerator {
    constructor(db) {
        this.db = db
    }

    menuGenerator() {
        const menu = new Scenes.BaseScene("menu")

        menu.enter(async (ctx) => {
            const userTg_id = ctx.update.message.from.id
            if (await this.db.getUser(`${userTg_id}`) === null) {
                await this.db.addUser(`${userTg_id}`)
            }
            const {isActive: isTurned} = (await this.db.getUser(`${userTg_id}`))
            const replyText = isTurned ? "бот включен" : "бот выключен"
            const buttonText = isTurned ? 'Выключить' : 'Включить'
            await ctx.reply(replyText, Markup
                .keyboard([
                    [`${buttonText}`],
                    ['Моментальная помощь'],
                    ['Связаться с создателем', 'Поддержать']
                ])
                .resize()
            )
        })

        menu.hears('Включить', async (ctx) => {
            const userTg_id = ctx.update.message.from.id
            await this.db.setUserActive(`${userTg_id}`, true)
            await ctx.scene.reenter()
        })

        menu.hears('Выключить', async (ctx) => {
            const userTg_id = ctx.update.message.from.id
            await this.db.setUserActive(`${userTg_id}`, false)
            await ctx.scene.reenter()
        })

        menu.hears('моментальная помощь', async (ctx) => {
            const id = randomNumb(0, await this.db.getAmountOfCompliments())
            const compliment = await this.db.getCompliment(id)
            await ctx.reply(compliment)
        })

        menu.hears('Связаться с создателем', async (ctx) => {
            await ctx.replyWithContact("+380984713688", 'Alex')
        })
        return menu
    }
}