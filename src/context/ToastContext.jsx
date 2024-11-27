import React, { createContext, useContext, useState, useEffect } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Crear contexto
const ToastContext = createContext()

// Hook para usar el Toast
export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: '' })
  const [isShowing, setIsShowing] = useState(false)
  const opacity = new Animated.Value(0)

  // Mostrar el Toast
  const showToast = (message, type = 'success') => {
    if (isShowing) return // Evita que se muestre más de un Toast a la vez

    setToast({ visible: true, message, type })
    setIsShowing(true)

    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(hideToast, 3000) // Mantener el Toast visible durante 3 segundos
    })
  }

  // Ocultar el Toast
  const hideToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setToast({ visible: false, message: '', type: '' })
      setIsShowing(false)
    })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 20,
            right: 20,
            padding: 15,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: toast.type === 'success' ? 'green' : 'red',
            opacity,
            elevation: 5, // Sombra para Android
            shadowColor: 'black', // Sombra para iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            zIndex: 100,
          }}
        >
          <Ionicons
            name={
              toast.type === 'success'
                ? 'checkmark-circle-outline'
                : 'close-circle-outline'
            }
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: 'white', fontSize: 16, flex: 1 }}>
            {toast.message}
          </Text>
          <TouchableOpacity onPress={hideToast}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </ToastContext.Provider>
  )
}
