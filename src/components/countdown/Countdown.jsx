import { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { Audio } from 'expo-av'
import { countdownUtils } from '../../utils/index.utils'

const Countdown = ({ mounted, setMounted }) => {
  const [sound, setSound] = useState(null)

  const [countDown, setCountDown] = useState(10)
  const [messageCountDown, setMessageCountDown] = useState(false)
  const intervalCountDown = useRef(null)

  const playSound = async (file) => {
    const { sound } = await Audio.Sound.createAsync(file)
    setSound(sound)
    await sound.playAsync()
  }
  const releaseSound = async () => {
    if (sound) {
      await sound.unloadAsync()
      setSound(null)
    }
  }

  const showMessageCountDown = (num) => {
    const message = countdownUtils.getMessageCountdown(num)
    setMessageCountDown(message)
  }

  const showMessageGo = () => {
    const random = Math.floor(Math.random() * 11)
    const message = countdownUtils.getMessageGo()
    setMessageCountDown(message)
  }

  const stopCountDown = () => {
    if (intervalCountDown.current) {
      clearInterval(intervalCountDown.current)
      intervalCountDown.current = null
    }
  }

  useEffect(() => {
    if (!mounted) {
      if (countDown % 3 === 0) showMessageCountDown(countDown)
      if (countDown === 0) {
        showMessageGo()
        playSound(require('../../../assets/beep.mp3'))
        setTimeout(() => {
          playSound(require('../../../assets/start.mp3'))
          setMounted(true)
        }, 1500)
      } else {
        playSound(require('../../../assets/beep.mp3'))
      }
    }
  }, [countDown])

  useEffect(() => {
    if (!mounted) {
      intervalCountDown.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev > 0) {
            return prev - 1
          } else {
            stopCountDown()
            return 0
          }
        })
      }, 1000)
    } else {
      releaseSound()
    }
  }, [mounted])

  return (
    <View className="flex-1 px-6 flex justify-center items-center">
      <Text
        style={{
          fontFamily: 'Jost_700Bold',
          fontSize: 22,
          color: 'white',
        }}
      >
        Comenzamos en
      </Text>

      {/* Caja contador */}
      <View className="mt-10 w-[100px] h-[100px] flex justify-center items-center border-2 border-white/30 rounded-lg">
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 50,
            color: 'white',
          }}
        >
          {countDown}
        </Text>
      </View>
      {messageCountDown && (
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            marginTop: 50,
            color: 'white',
          }}
        >
          {messageCountDown}
        </Text>
      )}
    </View>
  )
}

export default Countdown
