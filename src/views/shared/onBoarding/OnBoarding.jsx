import React, { useEffect, useState } from 'react'
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import welcome from 'assets/welcome.png'
import videogame from 'assets/videogame.png'
import start from 'assets/start.png'
import group from 'assets/group.png'
import classes from 'assets/classes.png'
import { useNavigation } from '@react-navigation/native'
import { storageUtil } from 'utils/index.utils'
import { useSharedValue } from 'react-native-reanimated'

const OnBoarding = () => {
  const navigation = useNavigation()
  const [hasLaunched, setHasLaunched] = useState(null) // Inicializamos como null
  const { width } = useWindowDimensions()
  const slideValue = useSharedValue(0)
  const [active, setActive] = useState(0)

  const data = [
    {
      id: 1,
      title: '¡Bienvenido a Codify!',
      subtitle:
        'Descubre una forma divertida y práctica de aprender programación.',
      image: welcome,
    },
    {
      id: 2,
      title: 'Aprende jugando',
      subtitle:
        'Explora diferentes juegos interactivos diseñados para reforzar tus conocimientos de programación.',
      image: videogame,
    },
    {
      id: 3,
      title: 'Grupos de aprendizaje',
      subtitle:
        'Únete a un curso creado por tu docente donde podrás aprender junto a tus compañeros.',
      image: group,
    },
    {
      id: 4,
      title: 'Clases interactivas',
      subtitle:
        'Participa en clases dinámicas con actividades prácticas para aprender paso a paso.',
      image: classes,
    },
    {
      id: 5,
      title: '¡Empieza hoy mismo!',
      subtitle:
        'Únete a Codify y transforma la manera en que aprendes programación. ¡Es hora de comenzar!',
      image: start,
    },
  ]

  // Cargar el estado de 'hasLaunched' al iniciar
  useEffect(() => {
    storageUtil
      .getSecureData('hasLaunched')
      .then((res) => {
        // Si no existe el dato, consideramos que es la primera vez que se lanza
        if (res !== null) {
          setHasLaunched(res)
        } else {
          setHasLaunched(false) // O el valor que desees por defecto
        }
      })
      .catch((err) => {
        console.error('Error al leer el dato:', err)
        setHasLaunched(false) // O el valor que desees por defecto
      })
  }, [])

  // Efecto para navegar después de que se haya determinado si es la primera vez
  useEffect(() => {
    if (hasLaunched !== null) {
      if (hasLaunched) {
        navigation.replace('Login') // Reemplaza la pantalla de OnBoarding por la de Login
      }
    }
  }, [hasLaunched, navigation])

  const onScroll = ({ nativeEvent }) =>
    (slideValue.value =
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)

  const onScrollEnd = ({ nativeEvent }) =>
    setActive(
      Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      )
    )

  const goToLogin = async () => {
    await storageUtil.saveSecureData('hasLaunched', true)
    navigation.replace('Login')
  }

  if (hasLaunched === null) {
    // Muestra una pantalla de carga mientras verificamos si el onboarding ya se ha lanzado
    return (
      <View style={style.container}>
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={style.container}>
      <ScrollView
        style={{
          height: 'auto',
          alignSelf: 'stretch',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        onMomentumScrollEnd={onScrollEnd}
      >
        {data.map((x, i) => (
          <View style={{ height: 'auto', width }} key={x.id}>
            <View style={{ flex: 1 }} />
            <View
              style={{
                height: 'auto',
                width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={x.image}
                style={{
                  width: 250,
                  height: 325,
                }}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                height: 'auto',
                width,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 25,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: '#741D1D',
                  marginBottom: 14,
                }}
              >
                {x.title}
              </Text>
            </View>

            <View
              style={{
                height: 'auto',
                width,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 16,
                  color: '#888',
                  textAlign: 'center',
                }}
              >
                {x.subtitle}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          height: 50,
          width,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
          }}
        >
          {data.map((x, i) => (
            <View
              key={x.id}
              style={{
                width: 15,
                height: 5,
                backgroundColor: active >= i ? '#741D1D' : '#888',
                borderRadius: 20,
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          disabled={active !== data.length - 1}
          onPress={goToLogin}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: active === data.length - 1 ? '#741D1D' : '#888',
            }}
          >
            Finalizar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FF',
  },
})

export default OnBoarding
