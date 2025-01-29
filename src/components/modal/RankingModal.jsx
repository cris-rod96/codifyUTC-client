import { Ionicons, Octicons } from '@expo/vector-icons'
import { Image, Modal, ScrollView, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import profile from 'assets/profile.png'
import { useEffect, useState } from 'react'

const RankingModal = ({ isVisible, onClose, responses }) => {
  const [userRanking, setUserRanking] = useState(null)

  useEffect(() => {
    if (responses && responses.length > 0) {
      console.log('entra')
      const formatRanking = responses.map((response, index) => {
        const position = index + 1
        let medal = null

        if (position === 1) medal = '#FFD700'
        if (position === 2) medal = '#C0C0C0'
        if (position === 3) medal = '#CD7F32'

        return {
          score_total: response.score_total,
          position,
          medal,
          full_name: response.User.full_name,
          profile_picture: response.User.profile_picture,
        }
      })
      console.log(formatRanking)
      setUserRanking(formatRanking)
    }
  }, [])

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View className="flex-1 bg-[#F5F9FF] flex flex-col">
        {/* Header */}
        <View className="px-5 py-5 border-b border-gray-200">
          <TouchableOpacity
            className="flex flex-row items-center gap-2"
            onPress={onClose}
          >
            <Octicons name="arrow-left" color={'#202244'} size={21} />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 21,
                color: '#202244',
              }}
            >
              Ranking
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-5 "
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
        >
          {userRanking &&
            userRanking.map((usr, idx) => (
              <View
                className="flex flex-row items-center py-4 border-b border-gray-200"
                key={idx}
              >
                <View
                  className={`w-10 flex justify-center items-center h-10 rounded-xl 
                  }`}
                  style={{
                    backgroundColor: usr.medal ? usr.medal : 'white',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 18,
                      color: usr.medal ? 'white' : '#000',
                    }}
                  >
                    {usr.position}
                  </Text>
                </View>

                <View className="flex-1 flex-row gap-2 items-center pl-2">
                  {/* Profile */}
                  <View className="w-16 h-16 rounded-full relative bg-red-100 border border-gray-300">
                    <Image
                      source={
                        usr.profile_picture
                          ? { uri: usr.profile_picture }
                          : profile
                      }
                      className="w-full h-full object-contain rounded-full"
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex flex-col flex-wrap">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 14,
                        color: '#202244',
                      }}
                    >
                      {usr.full_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 12,
                        color: '#888',
                      }}
                    >
                      {usr.score_total} pts
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

export default RankingModal
