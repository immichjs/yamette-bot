require('dotenv').config()

const Discord = require('discord.js')

// Commands
const help = require('./commands/help')
const join = require('./commands/join')
const leave = require('./commands/leave')
const play = require('./commands/play')
const stop = require('./commands/stop')
const pause = require('./commands/pause')
const resume = require('./commands/resume')

const client = new Discord.Client()

const TOKEN = process.env.TOKEN
const BOTName = process.env.BOT_NAME
const prefix = process.env.PREFIX

const servers = {
  server: {
    connection: null,
    dispatcher: null
  }
}

const automaticJoin = async options => {
  try {
    if (options.sendMessage)
      options.message.channel.send(`**${BOTName}:** Estou entrando no canal de voz **${options.message.author.username}**. :)`)

    servers.server.connection = await options.message.member.voice.channel.join()
  } catch (error) {
    options.sendMessage = true
    options.message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar entrar no canal de voz.`)
  } finally {
    return
  }
}

client.on('ready', () => {
  console.log(`${BOTName}: I'm Alive Kami-sama!`)
  client.user.setActivity(`music | ${prefix}help`)
})

client.on('message', async message => {
  if (!message.guild) return
  if (!message.content.startsWith(prefix)) return

  help({ message, prefix, BOTName })

  if (!message.member.voice.channel) {
     message.channel.send(`**${BOTName}:** Você precisa estar em um canal de voz.`)
     return
  }

  join({ message, prefix, automaticJoin })
  leave({ message, prefix, BOTName, servers })
  play({ message, prefix, BOTName, servers, automaticJoin })
  stop({ message, prefix, BOTName, servers })
  pause({ message, prefix, BOTName, servers })
  resume({ message, prefix, BOTName, servers })
})

client.login(TOKEN)
