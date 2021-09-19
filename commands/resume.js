function resume ({ message, prefix, BOTName, servers }) {
  if (message.content.startsWith(`${prefix}resume`)) {
    try {
      message.channel.send(`**${BOTName}:** Voltei a tocar a música.`)

      servers.server.dispatcher.resume()
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar continuar a música. **${prefix}help**`)
    } finally {
      return
    }
  }
}

module.exports = resume
