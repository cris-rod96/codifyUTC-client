const messagesCountDown = [
  '¡La aventura está a punto de comenzar!',
  'El juego te espera, ¡prepárate!',
  'Afina tus habilidades, ¡el momento se acerca!',
  'La programación está en tus manos.',
  'Cada segundo cuenta, ¡enfócate!',
  '¡El conocimiento será tu mayor aliado!',
  'Estás a un paso de brillar en el código.',
  'Todo listo, ¡es tu momento!',
  'Respira hondo, ¡a demostrar de qué estás hecho!',
  '¡Hoy será un gran día para aprender!',
]

const messagesGo = [
  '¡Es el momento, dale todo lo que tienes!',
  '¡Demuestra tu destreza, comienza ahora!',
  '¡Adelante, el aprendizaje es tuyo!',
  '¡Tu viaje hacia el conocimiento empieza ahora!',
  '¡Haz que este momento cuente!',
  '¡A programar como nunca antes!',
  '¡El éxito está a solo un clic de distancia!',
  '¡Vamos, la diversión está garantizada!',
  '¡Este es el comienzo de algo increíble!',
  '¡Piensa, crea y triunfa, empieza ya!',
  '¡La acción comienza ahora!',
  '¡Tu momento ha llegado, no lo dejes pasar!',
  '¡Este es tu tiempo, hazlo valer!',
  '¡Crea magia con cada línea de código!',
  '¡A demostrar que tienes lo necesario!',
  '¡Haz historia en este desafío!',
  '¡Todos los ojos están en ti, a programar!',
  '¡Respira, concentra tu energía y comienza!',
  '¡Nada puede detenerte ahora!',
  '¡El aprendizaje te espera, da lo mejor de ti!',
]

const getMessageCountdown = (num) => {
  const message = messagesCountDown[num - 1]
  return message
}

const getMessageGo = () => {
  const random = Math.floor(Math.random() * 11)
  const message = messagesGo[random]
  return message
}

export default { getMessageCountdown, getMessageGo }
