function help ({ message, prefix, BOTName }) {
  if (message.content.startsWith(`${prefix}help`)) {
    message.channel.send(
      `**${BOTName}:** Aqui está alguns comandos disponíveis até o momento. \n\n` + 
      `**${prefix}join** - Me junto ao canal de voz com você. :point_right: :point_left:\n` + 
      `**${prefix}leave** - Me retiro automaticamente do canal de voz. :expressionless: \n` +
      `**${prefix}play { link }** - Começo a tocar a música que você desejar. :microphone: \n` +
      `**${prefix}stop** - Paro de tocar a música que estiver em reprodução no momento. :triumph: \n` +
      `**${prefix}pause** - Pauso a sua música por determinado tempo. :pause_button: \n` +
      `**${prefix}resume** - Retomo a música que estiver pausada. :arrow_forward: \n` +
      `**${prefix}next** - Passo para a próxima música. :track_next: \n\n` +
      `**${prefix}queue** - Mostro as músicas presentes na playlist. :notes: \n\n` +
      `**${BOTName}:** Em breve mais comandos e funcionalidades estarão disponíveis para utilizar! :smiling_face_with_3_hearts:`
    )
  }
}

module.exports = help
