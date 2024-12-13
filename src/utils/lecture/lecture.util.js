const estimateReadingTime = (content) => {
  const words = content.split(/\s+/).length // Dividimos el contenido en palabras
  const wordsPerMinute = 200 // Promedio de palabras por minuto
  const timeInMinutes = Math.ceil(words / wordsPerMinute) // Estimamos el tiempo en minutos y redondeamos hacia arriba
  return timeInMinutes
}

const getTotalEstimatedReadingTime = (lectures) => {
  const totalReadingTime = lectures.Topics.reduce((total, topic) => {
    const topicReadingTime = estimateReadingTime(topic.content)
    return total + topicReadingTime
  }, 0)

  return totalReadingTime
}

export default { estimateReadingTime, getTotalEstimatedReadingTime }
