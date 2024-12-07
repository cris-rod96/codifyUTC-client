import React from 'react'
import { View, Text, Image } from 'react-native'

const LevelCard = ({
  level,
  title,
  description,
  currentScore,
  minScore,
  maxScore,
  nextLevelName,
  levelImage,
  motivationalPhrase,
}) => {
  // Calculamos los porcentajes de la barra
  const currentPercentage =
    ((currentScore - minScore) / (maxScore - minScore)) * 100
  const minPercentage = 0 // Siempre empieza en el 0%
  const maxPercentage = 100 // Siempre termina en el 100%

  return (
    <View className="flex flex-col justify-center items-center bg-white rounded-xl p-6 mb-6 shadow-md shadow-gray-300">
      {/* Imagen del nivel */}
      <View className="relative w-[180px] h-[180px] mb-4">
        <Image
          source={levelImage} // Aquí puedes poner la imagen del nivel
          className="w-full h-full absolute object-cover rounded-full"
        />
      </View>

      {/* Nombre del nivel */}
      <Text className="text-2xl font-semibold text-gray-800 mb-2">{title}</Text>

      {/* Descripción del nivel */}
      <Text className="text-center text-sm text-gray-500 mb-3">
        {description}
      </Text>

      {/* Barra de progreso */}
      <View className="w-full mb-4">
        <Text className="text-sm text-gray-600 mb-1">Progreso:</Text>
        <View className="w-full bg-gray-200 h-2 rounded-full relative">
          {/* Barra de fondo */}
          <View
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: `${currentPercentage}%` }}
          />

          {/* Indicador del puntaje mínimo (inicio) */}
          <View
            className="absolute top-0 left-0 h-full bg-blue-500 w-2 rounded-full"
            style={{ left: `${(minPercentage / 100) * 100}%` }}
          />
          {/* Puntaje mínimo */}
          <Text
            className="absolute top-[25px] left-[-20px] text-xs text-blue-500 font-semibold"
            style={{ left: `${(minPercentage / 100) * 100}%` }}
          >
            {minScore}
          </Text>

          {/* Indicador del puntaje actual */}
          <View
            className="absolute top-0 left-0 h-full bg-yellow-500 w-2 rounded-full"
            style={{ left: `${currentPercentage}%` }}
          />
          {/* Puntaje actual */}
          <Text
            className="absolute top-[25px] left-[-20px] text-xs text-yellow-500 font-semibold"
            style={{ left: `${currentPercentage}%` }}
          >
            {currentScore}
          </Text>

          {/* Indicador del puntaje máximo (fin) */}
          <View
            className="absolute top-0 left-0 h-full bg-red-500 w-2 rounded-full"
            style={{ left: `${(maxPercentage / 100) * 100}%` }}
          />
          {/* Puntaje máximo y siguiente nivel */}
          <Text
            className="absolute top-[25px] right-2 text-xs text-red-500 font-semibold"
            style={{ left: `${(maxPercentage / 100) * 100}%` }}
          >
            {maxScore} - {nextLevelName}
          </Text>
        </View>
      </View>

      {/* Frase motivacional */}
      <Text className="text-center text-sm text-gray-400 italic mb-4">
        {motivationalPhrase}
      </Text>
    </View>
  )
}

export default LevelCard
