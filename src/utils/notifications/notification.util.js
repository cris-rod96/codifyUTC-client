const correctMessages = [
  '¡Bien hecho! Sigue así.',
  '¡Excelente! Vas por buen camino.',
  '¡Correcto! Estás aprendiendo rápido.',
  '¡Impresionante! Sabía que lo lograrías.',
  '¡Perfecto! Eres un genio.',
  '¡Fantástico! Sigue esforzándote.',
  '¡Bravo! Lo estás haciendo genial.',
  '¡Increíble! Cada vez mejor.',
  '¡Maravilloso! Tienes un gran talento.',
  '¡Excelente trabajo! Tu esfuerzo se nota.',
  '¡Eso es! Vas a conquistar este tema.',
  '¡Qué bien! Estás progresando rápido.',
  '¡Sensacional! Sigue practicando.',
  '¡Correcto! La práctica hace al maestro.',
  '¡Admirable! Qué gran habilidad.',
  '¡Eso es! Tu confianza es inspiradora.',
  '¡Buen trabajo! Estás avanzando mucho.',
  '¡Exacto! Eres realmente bueno en esto.',
  '¡Genial! Estoy orgulloso de ti.',
  '¡Asombroso! Lo tienes dominado.',
]

const incorrectMessages = [
  'No te preocupes, ¡puedes intentarlo de nuevo!',
  '¡Ánimo! Cada error es un paso hacia el aprendizaje.',
  'No pasa nada, ¡la próxima lo harás mejor!',
  '¡No te rindas! Sigue intentándolo.',
  'Todos cometemos errores, ¡tú puedes!',
  '¡Vamos! Eres capaz de mejorar.',
  'No es fácil, pero sé que lo lograrás.',
  '¡Sigue adelante! Aprende y crece.',
  '¡No te desanimes! Esto es solo una lección.',
  '¡Ánimo! La perseverancia da resultados.',
  'Un error no define tu capacidad, ¡adelante!',
  '¡Está bien equivocarse! Aprende de ello.',
  '¡No te frustres! Sigue practicando.',
  '¡Tienes esto! Solo necesitas un poco más.',
  'Cada error te acerca más al éxito.',
  '¡Vuelve a intentarlo! Estoy aquí para ayudarte.',
  '¡Es parte del proceso! Sigue practicando.',
  '¡Lo estás haciendo bien! Esto es solo un paso más.',
  'No siempre es fácil, ¡pero estás progresando!',
  '¡Recuerda! El aprendizaje lleva tiempo.',
]

const startMessages = [
  '¡Estamos a punto de comenzar! Prepara todo para esta experiencia.',
  'Es momento de enfocarte, ¡aléjate de cualquier distracción!',
  '¡Cuenta regresiva iniciada! Ajusta tus últimos detalles.',
  'Respira profundo, concéntrate, y prepárate para dar lo mejor de ti.',
]

const getCorrectMessage = () => {
  const randomIndex = Math.floor(Math.random() * correctMessages.length)
  return correctMessages[randomIndex]
}

const getIncorrectMessage = () => {
  const randomIndex = Math.floor(Math.random() * incorrectMessages.length)
  return incorrectMessages[randomIndex]
}

const getStartMessage = (index) => startMessages[index]

export default {
  getCorrectMessage,
  getIncorrectMessage,
  getStartMessage,
}
