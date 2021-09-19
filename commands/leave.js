function leave ({ message, prefix, BOTName, servers }) {
  if (message.content.startsWith(`${prefix}leave`)) {
    try {
      message.channel.send(`**${BOTName}:** Estou saindo do canal de voz. :(`)
      message.member.voice.channel.leave()
  
      servers.server.connection = null
      servers.server.dispatcher = null
    } catch (error) {
      message.channel.send(`**${BOTName}:** Ocorreu um erro ao tentar sair do canal de voz. **${prefix}help**`)
    } finally {
      return
    }
  }
}

module.exports = leave
