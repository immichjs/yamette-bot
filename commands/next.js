function next ({ message, prefix, BOTName, servers }) {
  if (message.content.startsWith(`${prefix}next`)) {
    try {
      message.channel.send(`**${BOTName}:** Passando para a próxima música. ${servers.server.queue[+1].snippet.title}`)

      servers.server.dispatcher.end()
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar parar a música. **${prefix}help**`)
    } finally {
      return
    }
  }
}

module.exports = next
