import { Octicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, useWindowDimensions } from 'react-native'
import { View } from 'react-native-animatable'

const CustomToast = ({
  setToast,
  type = 'success',
  title = 'Éxito',
  message = 'Operación exitosa',
}) => {
  const [left, setLeft] = useState(0)
  const { width } = useWindowDimensions()
  const bottom = useRef(new Animated.Value(-80)).current
  const opacity = useRef(new Animated.Value(0)).current

  // Definir colores según el tipo
  const backgroundColor = type === 'success' ? '#28a745' : '#dc3545' // Verde para éxito, rojo para error
  const iconColor = type === 'success' ? '#0f0' : '#fff'
  const iconName = type === 'success' ? 'check-circle' : 'x-circle'

  function animate() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bottom, {
          toValue: 20,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      Animated.delay(2000), // Mantener visible 2 segundos
      Animated.parallel([
        Animated.timing(bottom, {
          toValue: -80,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => setToast(false))
  }

  useEffect(() => {
    setLeft((width - 300) / 2)
  }, [width])

  useEffect(() => {
    animate()
  }, [])

  return (
    <Animated.View
      className="flex flex-row items-center w-[300px] absolute bg-white overflow-hidden border-l-4 shadow-md shadow-gray-300 rounded-lg"
      style={{
        left,
        bottom,
        opacity,
        borderLeftColor: backgroundColor,
      }}
    >
      <View className="flex flex-col px-3 py-2">
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 15,
            color: '#202244',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 12,
            color: '#202244',
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  )
}

export default CustomToast
