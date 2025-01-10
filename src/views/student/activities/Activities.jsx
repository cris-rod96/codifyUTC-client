// import { FontAwesome6, Octicons } from '@expo/vector-icons'
// import {
//   FlatList,
//   Image,
//   ScrollView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
// import StatusActivityModal from '../../../components/modal/StatusActivityModal'
// import { useEffect, useState } from 'react'

// import quizzImage from 'assets/quizz.png'
// import puzzleImage from 'assets/puzzle.png'
// import brainImage from 'assets/brain.png'
// import lightningImage from 'assets/lightning.png'

// const Activities = () => {
//   const [openModal, setOpenModal] = useState(false)
//   const [options, setOptions] = useState(null)
//   const [activities, setActivities] = useState([])
//   const toggleModal = () => setOpenModal((prev) => !prev)

//   const data = [
//     {
//       id: 1,
//       status: 'pending',
//       type: 'quizz',
//       descriptions: [
//         {
//           label: 'Preguntas',
//           value: 12,
//         },
//         {
//           label: 'Minutos',
//           value: 6,
//         },
//         {
//           label: 'Participantes',
//           value: 12,
//         },
//       ],

//       overdue: false,
//       overdue_date: 30 - 12 - 2024,
//     },

//     {
//       id: 2,
//       status: 'completed',
//       type: 'lightning',
//       descriptions: [
//         {
//           label: 'Preguntas',
//           value: 12,
//         },
//         {
//           label: 'Minutos',
//           value: 6,
//         },
//         {
//           label: 'Participantes',
//           value: 12,
//         },
//       ],
//       overdue: false,
//       overdue_date: 30 - 12 - 2024,
//     },

//     {
//       id: 3,
//       status: 'pending',
//       type: 'brain',
//       descriptions: [
//         {
//           label: 'Preguntas',
//           value: 12,
//         },
//         {
//           label: 'Minutos',
//           value: 6,
//         },
//         {
//           label: 'Participantes',
//           value: 12,
//         },
//       ],
//       overdue: false,
//       overdue_date: 30 - 12 - 2024,
//     },

//     {
//       id: 4,
//       status: 'pending',
//       type: 'puzzle',
//       descriptions: [
//         {
//           label: 'Preguntas',
//           value: 12,
//         },
//         {
//           label: 'Minutos',
//           value: 6,
//         },
//         {
//           label: 'Participantes',
//           value: 12,
//         },
//       ],
//       overdue: true,
//       overdue_date: 30 - 12 - 2024,
//     },
//   ]

//   const [search, setSearch] = useState('')
//   const handleSearch = (text) => setSearch(text)

//   const getImage = (type) => {
//     switch (type) {
//       case 'quizz':
//         return quizzImage
//       case 'puzzle':
//         return puzzleImage
//       case 'brain':
//         return brainImage
//       case 'lightning':
//         return lightningImage
//     }
//   }

//   const renderActivities = (item, index) => {
//     const bgColor = item.status === 'pending' ? 'bg-red-800' : 'bg-green-800'
//     const image = getImage(item.type)
//     const mb = index === activities.length - 1 ? 'mb-10' : 'mb-24'
//     return (
//       <View
//         className={`bg-white rounded-xl border border-gray-200 pt-16 shadow-sm shadow-red-800 ${mb}`}
//       >
//         <Image
//           source={image}
//           className="w-[100px] h-[100px] absolute -top-16 left-1/2 -translate-x-1/2"
//         />

//         <View className="flex flex-row gap-2 px-5">
//           {item.descriptions.map((desc, index) => (
//             <View
//               className={`flex-1 flex justify-center items-center py-5 border border-gray-200 rounded-lg ${bgColor}`}
//             >
//               <Text
//                 style={{
//                   fontFamily: 'Jost_600SemiBold',
//                   fontSize: 24,
//                   color: 'white',
//                 }}
//               >
//                 {desc.value}
//               </Text>
//               <Text
//                 style={{
//                   fontFamily: 'Mulish_700Bold',
//                   fontSize: 12,
//                   color: 'white',
//                 }}
//               >
//                 {desc.label}
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* Footer */}
//         <View className="mt-5 flex flex-col gap-1">
//           {item.status === 'pendiente' && (
//             <Text
//               style={{
//                 fontFamily: 'Mulish_700Bold',
//                 fontSize: 12,
//                 color: '#202244',
//                 textAlign: 'center',
//               }}
//             >
//               Disponible hasta el: 21-10-2024
//             </Text>
//           )}
//           <TouchableOpacity
//             className={`py-3 flex justify-center items-center ${bgColor} rounded-b-xl relative`}
//           >
//             <Text
//               style={{
//                 fontFamily: 'Mulish_700Bold',
//                 color: 'white',
//                 fontSize: 14,
//               }}
//             >
//               {item.status === 'pendiente' ? 'Realizar' : 'Completado'}
//             </Text>

//             <Octicons
//               name="arrow-right"
//               size={21}
//               color="white"
//               className="absolute right-5"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   }

//   useEffect(() => {
//     setActivities(data)
//   }, [])

//   useEffect(() => {
//     if (options !== null) {
//       const newActivities = data.filter((activity) => {
//         const matchesStatus =
//           options.status.length > 0
//             ? options.status.includes(activity.status)
//             : true

//         const matchesTypes =
//           options.types.length > 0
//             ? options.types.includes(activity.type)
//             : true
//         return matchesStatus && matchesTypes
//       })

//       setActivities(newActivities)
//     }
//   }, [options])

//   return (
//     <View className="flex-1 flex-col px-5 py-3">
//       <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
//       {/* Filtros (Buscador,buscar por tipo de juego y estado) */}
//       <View className="flex flex-col gap-1">
//         {/* Buscador */}
//         <View className="flex flex-row items-center justify-between h-[55px] bg-white rounded-xl overflow-hidden border border-gray-200 pr-2">
//           {/* Icono de busqueda */}
//           <View className="w-12 flex justify-center items-center">
//             <Octicons name="search" size={18} />
//           </View>
//           {/* Input de busqueda */}
//           <TextInput
//             style={{
//               fontFamily: 'Mulush_700Bold',
//               fontSize: 16,
//               color: '#B4BDC4',
//             }}
//             className="flex-1 h-full pl-2"
//             onChangeText={(value) => handleSearch(value)}
//             defaultValue={search}
//           />
//           {/* Icono de filtros */}
//           <TouchableOpacity
//             className="w-10 h-10 justify-center items-center bg-[#7D1D1D] rounded-lg"
//             onPress={toggleModal}
//           >
//             <FontAwesome6 name="sliders" size={17} color={'white'} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Activities */}
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}
//         style={{ marginTop: 5 }}
//       >
//         <View className="flex-1 mt-20">
//           {activities.map((activity, index) =>
//             renderActivities(activity, index)
//           )}
//         </View>
//       </ScrollView>

//       {/* Modal con el status de las actividades */}
//       <StatusActivityModal
//         openModal={openModal}
//         toggleModal={toggleModal}
//         setOptions={setOptions}
//       />
//     </View>
//   )
// }

// export default Activities

import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import QuizzGame from '../../../components/modal/QuizzGame'
import LightningGame from '../../../components/modal/LightningGame'
import PuzzleMasterGame from '../../../components/modal/PuzzleMasterGame'
import { useSelector } from 'react-redux'
import { classesAPI, coursesAPI, activitiesAPI } from 'api/index.api'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { Entypo, FontAwesome, Octicons } from '@expo/vector-icons'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import puzzleLogo from 'assets/puzzle.png'
import poster from 'assets/game-default.png'
import { dateUtils } from 'utils/index.utils'

const Activities = () => {
  const { user } = useSelector((state) => state.user)
  const [userCourse, setUserCourse] = useState(null)
  const [classes, setClasses] = useState([])
  const [activities, setActivities] = useState([])
  const navigation = useNavigation()
  const [showQuizzGame, setShowQuizzGame] = useState(false)
  const [showLightningGame, setShowLightningGame] = useState(false)
  const [activityId, setActivityId] = useState(null)

  const toggleQuizzGame = () => setShowQuizzGame((prev) => !prev)
  const toggleLightningGame = () => setShowLightningGame((prev) => !prev)

  const getLogo = (type) => {
    switch (type) {
      case 'Quizz Code':
        return quizzLogo
      case 'Lightning Code':
        return lightningLogo
      case 'Brain Boost':
        return brainLogo
      case 'Puzzle Master':
        return puzzleLogo
    }
  }

  const startGame = (type, activity_id) => {
    setActivityId(activity_id)
    if (type === 'Quizz Code') {
      toggleQuizzGame()
    }
  }

  const renderActivity = (activity) => {
    return (
      <View className="bg-white border border-gray-200 rounded-lg">
        <QuizzGame
          showQuizzGame={showQuizzGame}
          toggleQuizzGame={toggleQuizzGame}
          activity_id={activityId}
        />
        {/* Portada */}
        <View className="w-full h-[180px] bg-gray-800 rounded-t-lg relative">
          <Image
            source={activity.poster ? { uri: activity.poster } : poster}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
            className="rounded-t-lg"
          />

          <Image
            source={getLogo(activity.type)}
            className="absolute w-[35px] h-[35px] top-3 right-5"
          />

          <View
            className="px-3 py-1 absolute w-[60px] bottom-3 rounded-full flex flex-row items-center justify-center right-3"
            style={{
              backgroundColor:
                activity.status === 'Abierta' ? '#008B07' : '#B10303',
            }}
          >
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 10,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {activity.status}
            </Text>
          </View>
        </View>

        {/* Descripcion de la actividad */}
        <View className="flex flex-col px-3 py-5 gap-2">
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            {activity.type}
          </Text>

          <View className="flex flex-row gap-2 justify-between items-center">
            <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
              <Entypo name="game-controller" size={24} />
              <View className="flex flex-row items-center gap-1">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {activity.activities_count} juegos
                </Text>
              </View>
            </View>
            <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
              <Entypo name="trophy" size={24} />
              <View className="flex flex-row items-center gap-1">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {activity.total_score} pts
                </Text>
              </View>
            </View>
            <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
              <FontAwesome name="hourglass-half" size={24} />

              <View className="flex flex-row items-center gap-1">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {activity.total_time} segs
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center gap-2 mb-4 px-3">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Disponible hasta:
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#202244',
            }}
          >
            {dateUtils.formatDate(new Date(activity.due_date))}
          </Text>
        </View>

        <TouchableOpacity
          className="py-3 w-full rounded-b-lg bg-[#741D1D] flex flex-row items-center justify-center relative"
          onPress={() => startGame(activity.type, activity.id)}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Realizar
          </Text>
          <Octicons
            name="chevron-right"
            size={18}
            color={'white'}
            className="absolute right-5"
          />
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    const fetchAllActivities = async () => {
      if (classes.length > 0) {
        try {
          const classIds = classes.map((cls) => cls.id)
          const activitiesResponse = await Promise.all(
            classIds.map((id) =>
              activitiesAPI.getByClass(id).then((res) => res.data.activities)
            )
          )

          const allActivities = activitiesResponse.flat()
          setActivities(allActivities)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchAllActivities()
  }, [classes])

  useEffect(() => {
    if (userCourse !== null) {
      classesAPI
        .getByCourse(userCourse.id)
        .then((res) => {
          const { classes } = res.data
          setClasses(classes)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userCourse])

  useEffect(() => {
    const { id } = user
    coursesAPI
      .getAllWithStudents()
      .then((res) => {
        const { courses } = res.data
        const enrolledCourse = courses.find((course) =>
          course.Students.some((student) => student.id === id)
        )
        setUserCourse(enrolledCourse === undefined ? null : enrolledCourse)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <View className="flex flex-1 bg-[#F5F9FF]">
      {activities && activities.length > 0 ? (
        <View className="flex flex-col p-5">
          {/* Buscador */}
          <View className="flex flex-row justify-between bg-white border border-gray-200 rounded-lg h-[45px]">
            {/* Icono */}
            <View className="w-12 flex justify-center items-center h-full">
              <Octicons name="search" size={18} color={'#202244'} />
            </View>

            {/* Input */}
            <TextInput
              className="flex-1 h-full outline-none"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 15,
                color: '#202244',
              }}
            />

            <View className="w-12 h-full p-2 flex justify-center items-center">
              <TouchableOpacity className="bg-[#741D1D] p-2 rounded-lg">
                <Entypo name="sound-mix" size={16} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Actividades */}
          <View className="flex flex-col mt-5">
            {activities.map((act) => renderActivity(act))}
          </View>
        </View>
      ) : (
        <View className="px-5 flex-1 justify-center items-center flex-col">
          <View className=" w-full flex flex-col justify-center items-center">
            <LottieView
              source={emptyData}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
              }}
            />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Sin Actividades
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 16,
                color: '#888888',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              Actualmente el curso no cuenta con actividades disponibles
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default Activities
