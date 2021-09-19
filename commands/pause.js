function pause ({ message, prefix, BOTName, servers }) {
  if (message.content.startsWith(`${prefix}pause`)) {
    try {
      message.channel.send(`**${BOTName}:** A música foi pausada por **${message.author.username}**`)
  
      servers.server.dispatcher.pause()
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar pausar a música. **${prefix}help**`)
    } finally {
      return
    }
  }
}

module.exports = pause
