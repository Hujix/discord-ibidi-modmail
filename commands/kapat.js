const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')

module.exports = {
    name: 'kapat',
    async execute(message, args) {
        if (!message.channel.parentID === message.guild.channels.cache.find(m => m.name === "MODMAIL")) return
        let channelName = `${message.channel.name.split("-")[0]}`
        let channelTag = message.channel.name.split("-")[1]
        
        let User = message.guild.members.cache.find(r => r.user.tag.toLowerCase() === `${channelName}#${channelTag}`)
        User.user.send({
            embed: {
                author: {
                    text: message.author.tag,
                    icon_url: message.author.displayAvatarURL({
                        dynamic: true
                    })
                },
                color: colors.red,
                title: 'Talep Kapatıldı!',
                description: args.join(" ") ? args.join(" ") : "Bir sebep belirtilmedi!",
                footer: {
                    text: `${message.guild.name} | ${message.guild.id}`,
                    icon_url: message.guild.iconURL({
                        dynamic: true
                    })
                },
                timestamp: new Date()
            }
        })

        message.channel.send({
            embed: {
                description: 'Kanal kapatılıyor...',
                color: colors.blue,
            }
        })
        setTimeout(() => {
            message.channel.delete()
        }, 250)

    }
}