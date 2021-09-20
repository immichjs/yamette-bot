function queue ({ message, prefix, BOTName, servers }) {
  if (message.content.startsWith(`${prefix}queue`)) {
    if (!servers.server.queue.length) {
      message.channel.send(`**${BOTName}:** Não possui nenhuma música nas minhas playlist.`)
      return
    } else {
      message.channel.send(
        `**${BOTName}:** Esse funcionamento ainda está em desenvolvimento.`
      )
    }
  }
}

module.exports = queue
