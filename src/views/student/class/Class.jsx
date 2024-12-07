import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native'
import Loading from '../../../components/loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { storageUtil } from '../../../utils/index.utils'
import { classesAPI } from '../../../api/classes/classes.api'
import { saveAllClassesByCourse } from '../../../redux/slices/student.slice'
import { Ionicons } from '@expo/vector-icons'
import image from '../../../../assets/web-dev.jpg'
import AccessCodeModal from '../../../components/modal/AccessCodeModal'
import { useAccesssCodeModal } from '../../../context/AccessCodeModalContext'

const Class = () => {
  // Contexto del modal
  const { isVisible, toggleModal } = useAccesssCodeModal()
  const toggleUpdateClass = () => {}

  //Redux - Clases
  const { classes } = useSelector((state) => state.student)
  const dispatch = useDispatch()

  // Loadinng
  const [showLoading, setShowLoading] = useState(true)

  // Id del curso del estudiante
  const [courseId, setCourseId] = useState(null)
  // Mostrar listass de cursos en el caso de que el estudiante no este en uno
  const [courses, setCourses] = useState([])
  const [showCourses, setShowCourses] = useState(false)

  setTimeout(() => {
    setShowLoading(false)
  }, 1500)

  // Listar todos los cursos

  useEffect(() => {
    setShowLoading(true)
    if (showCourses) {
      // Obtener el listado de todos los cursos registrados

      // Simularemos la carga
      setTimeout(() => {
        setShowLoading(false)
      }, 1500)
    }
  }, [showCourses])

  // OBtener las clases del curso
  useEffect(() => {
    if (courseId !== null) {
      classesAPI
        .getByCourse(courseId)
        .then((res) => {
          const { code, classes } = res.data
          dispatch(saveAllClassesByCourse(classes))
        })
        .catch((err) => {
          console.log('Error', err)
        })
    }
  }, [courseId])

  // Al cargar verificamos los datos de session del estudiante y obtenemos el id del curso
  useEffect(() => {
    if (courseId === null) {
      storageUtil
        .getSecureData('user_info')
        .then((res) => {
          if (res !== null) {
            const { user } = JSON.parse(res)
            if (user.courses.length > 0) {
              setCourseId(user.courses[0].id)
            }
          }
        })
        .catch((err) => console.log(err))
    }
  }, [])

  return showLoading ? (
    <Loading message={'Cargando clases...'} />
  ) : (
    <View className="flex-1 bg-[#F5F9FF]">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F5F9FF'} />
      <View className="w-[85%] mx-auto py-10 flex flex-col">
        {/* Si el estudiante no esta en un curso */}
        {!courseId && !showCourses && (
          <TouchableOpacity
            className="p-6 bg-white border-dashed border-2 border-gray-300 flex flex-col gap-3"
            onPress={() => setShowCourses(true)}
          >
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 13,
                color: '#202244',
                textAlign: 'center',
              }}
            >
              Actualmente no estas registrado en ningún curso
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_400Regular',
                fontSize: 12,
                color: '#545454',
                textAlign: 'center',
              }}
            >
              Accede a un curso para ver las clases
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_400Regular',
                fontSize: 11,
                color: '#545454',
                textAlign: 'center',
              }}
            >
              Recuerda que tu Docente debe proporcionar un código de acceso
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 11,
                color: '#741D1D',
                textAlign: 'center',
              }}
            >
              Presiona para mostrar los cursos
            </Text>
          </TouchableOpacity>
        )}

        {/* Mostrar listado de cursos */}
        {showCourses &&
          (courses.length > 0 ? (
            <View className="flex flex-col gap-3 bg-[#F5F9FF]">
              <TextInput
                placeholder="Buscar curso"
                className="px-3 py-5 bg-white  border border-gray-200 shadow-lg shadow-gray-300 mb-5 rounded-lg"
                style={{ fontFamily: 'Mulish_400Regular', fontSize: 14 }}
              />
              {/* Simular un curso usar flatlist */}
              <TouchableOpacity
                className="w-full  bg-white border border-gray-200 rounded-xl shadow-sm shadow-gray-300 relative"
                onPress={toggleModal}
              >
                <View className="h-[180px] w-full relative bg-red-500 rounded-t-xl overflow-hidden">
                  <Image
                    source={image}
                    className="absolute w-full h-full object-cover rounded-t-xl"
                  />
                </View>

                {/* Contenido */}
                <View className="flex flex-col gap-3 px-6 py-4">
                  <View className="flex flex-row items-center justify-between">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 18,
                        color: '#202244',
                        fontWeight: '600',
                      }}
                    >
                      Desarrollo Web
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 14,
                        color: '#fffff',
                        fontWeight: '500',
                      }}
                    >
                      Tercero Sistemas
                    </Text>
                  </View>

                  <View className="flex flex-row gap-3 items-center justify-center">
                    <View className="flex flex-col justify-center items-center border border-white rounded-lg px-3 py-1 bg-white">
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 18,
                          color: '#202244',
                        }}
                      >
                        19
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Mulish_400Regular',
                          fontSize: 12,
                          color: '#202244',
                        }}
                      >
                        Clases
                      </Text>
                    </View>
                    <View className="flex flex-col justify-center items-center border border-white rounded-lg px-3 py-1 bg-white">
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 18,
                          color: '#202244',
                        }}
                      >
                        30
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Mulish_400Regular',
                          fontSize: 12,
                          color: '#202244',
                        }}
                      >
                        Estudiantes
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Candado */}
                <Ionicons
                  name="lock-closed-sharp"
                  size={20}
                  color={'#741D1D'}
                  className="absolute right-3 -top-3"
                />

                {/*Mascara de bloqueo*/}
                <View className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></View>
              </TouchableOpacity>

              <AccessCodeModal
                isVisible={isVisible}
                toggleModal={toggleModal}
                toggleUpdateClass={toggleUpdateClass}
              />
            </View>
          ) : (
            <View className="p-6 bg-white border-dashed border-2 border-gray-300 flex flex-col gap-3">
              <Text
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 13,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Actualmente no hay cursos disponibles
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 12,
                  color: '#545454',
                  textAlign: 'center',
                }}
              >
                Consulta con tu docente
              </Text>
            </View>
          ))}

        {/* Mostrar las clases */}
        {courseId &&
          !showCourses &&
          (classes.length > 0 ? (
            <FlatList
              data={classes}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              renderItem={({ item, index }) => {
                const isExpanded = expanded === index
                return (
                  <View>
                    <View className="bg-white border border-gray-300 rounded-lg shadow-md my-2">
                      <TouchableOpacity
                        onPress={() => toggleAccordion(index)}
                        className="px-4 py-4 bg-gray-100 rounded-t-lg flex flex-row justify-between items-center"
                      >
                        <View>
                          <Text
                            className="text-lg font-semibold text-gray-800"
                            style={{
                              fontFamily: 'Jost_600SemiBold',
                              fontSize: 16,
                              color: '#202244',
                            }}
                          >
                            Introducción a React Native
                          </Text>
                          <View className="flex flex-row gap-1">
                            <Text
                              style={{
                                fontFamily: 'Mulish_400Regular',
                                fontSize: 9,
                                color: '#545454',
                              }}
                            >
                              05 de Diciembre del 2024 -
                            </Text>

                            <Text
                              style={{
                                fontFamily: 'Mulish_400Regular',
                                fontSize: 9,
                                color: '#741D1D',
                              }}
                            >
                              3 Actividades
                            </Text>
                          </View>
                        </View>
                        <Ionicons
                          name={
                            isExpanded
                              ? 'chevron-up-outline'
                              : 'chevron-down-outline'
                          }
                          size={24}
                          color="gray"
                        />
                      </TouchableOpacity>

                      {isExpanded && (
                        <Animated.View
                          style={{
                            height: animatedHeight,
                            overflow: 'hidden',
                          }}
                        >
                          <View className="px-4 py-3 bg-white">
                            {content.map((item, index) => (
                              <Text
                                key={index}
                                className="text-gray-700 text-sm my-1"
                              >
                                {item}
                              </Text>
                            ))}
                          </View>
                        </Animated.View>
                      )}
                    </View>
                  </View>
                )
              }}
            />
          ) : (
            <View className="p-6 bg-white border-dashed border-2 border-gray-300 flex flex-col gap-3">
              <Text
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 13,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Actualmente no hay clases disponibles
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 12,
                  color: '#545454',
                  textAlign: 'center',
                }}
              >
                Consulta con tu docente
              </Text>
            </View>
          ))}
      </View>
    </View>
  )
}

export default Class
