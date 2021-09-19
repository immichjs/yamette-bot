function join ({ message, prefix, automaticJoin }) {
  if (message.content.startsWith(`${prefix}join`))
    automaticJoin({ message, sendMessage: true })
}

module.exports = join
