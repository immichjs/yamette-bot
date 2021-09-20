const ytdl = require('ytdl-core')
const Google = require('googleapis')

const youtube = new Google.youtube_v3.Youtube({
  version: 'v3',
  auth: process.env.GOOGLE_KEY
})

async function play ({ message, prefix, BOTName, servers, automaticJoin, client }) {
  if (message.content.startsWith(`${prefix}play`)) {
    try {
      let musicURLOrName = message.content.slice(6)

      if (musicURLOrName.length === 0) {
        message.channel.send(`Me fale algo que gostaria de escutar hoje. **${prefix}play <link | Ex: Dojacat - Woman>**`)
        return
      }
      
      if (!client.voice.connections.size)
        await automaticJoin({ message, sendMessage: false })

      if (ytdl.validateURL(musicURLOrName)) {
        servers.server.queue.push(musicURLOrName)

        if (servers.server.queue.length === 1) {
          message.channel.send(`**${BOTName}:** Tocando agora: ${musicURLOrName}`)
        } else {
          message.channel.send(`**${BOTName}:** ${musicURLOrName} foi adicionada na playlist a ser tocada.`)
        }

        playMusic(servers)
        return
      } else {
        youtube.search.list({
          q: musicURLOrName,
          part: 'snippet',
          fields: 'items(id(videoId),snippet(title))',
          type: 'video'
        }, async function (error, result) {
          if (await error) {
            console.log(error)
          }
          if (await result) {
            const videoId = result.data.items[0].id.videoId

            musicURLOrName = `https://youtu.be/${videoId}`
            servers.server.queue.push(musicURLOrName)
          }
        })

        playMusic(servers)
      }
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar tocar reproduzir música. **${prefix}help**`)
    } finally {
      return
    }
  }
}

const playMusic = (servers) => {
  if (servers.server.imPlaying === false) {
    const playing = servers.server.queue[0]
    
    servers.server.imPlaying = true
    servers.server.dispatcher = servers.server.connection.play(ytdl(playing, { filter: 'audioonly' }))
  
    servers.server.dispatcher.on('finish', () => {
      servers.server.queue.shift()
  
      servers.server.imPlaying = false
        
      if (servers.server.queue.length > 0) {
        playMusic(servers)
      } else {
        servers.server.dispatcher = null
      }
    })
  }
}

module.exports = {
  play,
  playMusic
}
