const ytdl = require('ytdl-core')
const Discord = require('discord.js')

const ytdlOptions = { filter: 'audioonly' }
const client = new Discord.Client()

async function play ({ message, prefix, BOTName, servers, automaticJoin }) {
  if (message.content.startsWith(`${prefix}play`)) {
    try {
      let musicURL
      
      if (message.content.startsWith(`${prefix}play`)) musicURL = message.content.slice(6)
      
      if (ytdl.validateURL(musicURL)) {
        if (!client.voice.connections.size)
          await automaticJoin({ message, sendMessage: false })

        servers.server.dispatcher = await servers.server.connection.play(ytdl(musicURL, ytdlOptions))
        message.channel.send(`**${BOTName}:** Tocando agora: ${musicURL}`)

        return
      } else {
        message.channel.send(`**${BOTName}:** O link que que voce me enviou é inválido. Tente novamente com **$play [link]**`)
      }
      musicURL = null
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar tocar reproduzir música. **${prefix}help**`)
    } finally {
      return
    }
  }
}

module.exports = play
