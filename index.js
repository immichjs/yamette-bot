require('dotenv').config()

const Discord = require('discord.js')

// Commands
const help = require('./commands/help')
const join = require('./commands/join')
const leave = require('./commands/leave')
const { play } = require('./commands/play')
const stop = require('./commands/stop')
const pause = require('./commands/pause')
const resume = require('./commands/resume')
const next = require('./commands/next')
const queue = require('./commands/queue')

const client = new Discord.Client()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const BOTName = process.env.BOT_NAME
const prefix = process.env.PREFIX

const servers = {
  server: {
    connection: null,
    dispatcher: null,
    queue: [],
    imPlaying: false
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
  const options = { message, prefix, BOTName, servers, automaticJoin, client }

  if (!message.guild) return
  if (!message.content.startsWith(prefix)) return
  
  help(options)
  
  if (message.author.username !== "<I'm Mich/>" && message.author.username !== "light") {
    message.channel.send(`**${BOTName}:** Somente meu criado **<I'm Mich/>** está podendo me utilizar por enquanto, aguarde até o meu lançamento. :)`)
    return
  }

  if (!message.member.voice.channel) {
     message.channel.send(`**${BOTName}:** Você precisa estar em um canal de voz.`)
     return
  }

  join(options)
  leave(options)
  play(options)
  stop(options)
  pause(options)
  resume(options)
  next(options)
  queue(options)
})

client.login(DISCORD_TOKEN)
