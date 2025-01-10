import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated'

const PuzzleMasterGame = () => {
  const [codeLines, setCodeLines] = useState([
    { id: '1', text: 'const suma = (a, b) => {' },
    { id: '2', text: '  return a + b;' },
    { id: '3', text: '};' },
  ])

  // Estado para gestionar el índice de item arrastrado
  const [draggingIndex, setDraggingIndex] = useState(null)

  // Función para mover los ítems en el array
  const moveItem = (fromIndex, toIndex) => {
    const updatedCodeLines = [...codeLines]
    const [movedItem] = updatedCodeLines.splice(fromIndex, 1)
    updatedCodeLines.splice(toIndex, 0, movedItem)
    setCodeLines(updatedCodeLines)
  }

  // Componente para representar cada ítem de la lista
  const DraggableItem = ({ item, index }) => {
    const translateY = useSharedValue(0)

    // Función que actualiza el movimiento del ítem
    const onGestureEvent = (event) => {
      translateY.value = event.translationY
    }

    // Detectar cuando el ítem se suelta
    const onGestureEnd = (event) => {
      const newIndex = Math.max(
        0,
        Math.min(codeLines.length - 1, Math.floor(translateY.value / 80))
      )
      if (newIndex !== index) {
        runOnJS(moveItem)(index, newIndex) // Mueve el ítem al nuevo índice de forma inmediata
      }
      translateY.value = withSpring(0) // Volver a la posición original
    }

    // Animación para el movimiento del ítem
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: withSpring(translateY.value) }],
      }
    })

    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEnd}
      >
        <Animated.View style={[styles.item, animatedStyle]}>
          <Text>{item.text}</Text>
        </Animated.View>
      </PanGestureHandler>
    )
  }

  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={() => {}}
      animationType="fade"
    >
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.innerContainer}>
          {codeLines.map((item, index) => (
            <DraggableItem key={item.id} item={item} index={index} />
          ))}
        </View>
      </GestureHandlerRootView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PuzzleMasterGame
