function stop ({ message, prefix, BOTName, servers }) {
  if (message.content.startsWith(`${prefix}stop`)) {
    try {
      message.channel.send(`**${BOTName}:** Não tocarei mais esta música.`)

      servers.server.dispatcher.end()
      servers.server.queue = []
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar parar a música. **${prefix}help**`)
    } finally {
      return
    }
  }
}

module.exports = stop
