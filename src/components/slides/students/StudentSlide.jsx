import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import profile from 'assets/profile.png'
import { useSelector } from 'react-redux'
const StudentsSlide = () => {
  const { user } = useSelector((state) => state.user)
  const { students, courses } = useSelector((state) => state.teacher)
  const [allStudents, setAllStudents] = useState([])

  const getNameCourse = (id) => {
    const course = courses.find((cr) => cr.id === id)
    return course.subject
  }

  useEffect(() => {
    const students = courses.flatMap((course) => course.Students)
    setAllStudents(students)
  }, [user])

  return (
    <View className="flex flex-col gap-3 w-full">
      {/* Encabezado común */}
      <View className="flex flex-row items-center w-full justify-between">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          Alumnos
        </Text>
        {students.length > 0 && (
          <TouchableOpacity className="w-fit flex flex-row items-center">
            <Text
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 12,
                color: '#0961F5',
                textAlign: 'center',
              }}
            >
              Ver todas
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#0961F5" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contenido condicional */}
      {allStudents.length > 0 ? (
        <FlatList
          data={allStudents}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          initialNumToRender={1} // Renderiza solo el primer elemento inicialmente
          windowSize={3} // Carga solo los elementos cercanos
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className="flex flex-col justify- items-center gap-3  mr-5  py-3"
              key={item.id}
            >
              {/* Foto */}
              <View className="w-[100px] h-[100px] rounded-full bg-red-500 relative overflow-hidden border border-gray-200">
                <Image
                  source={
                    item.profile_picture
                      ? { uri: item.profile_picture }
                      : profile
                  }
                  className="absolute w-full h-full object-contain"
                />
              </View>

              {/* Info */}
              <View className="flex flex-col justify-center items-center">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 12,
                    color: '#202244',
                  }}
                >
                  {item.full_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Mulish_400Regular',
                    fontSize: 12,
                    color: '#888',
                  }}
                >
                  {getNameCourse(item.CourseStudent.CourseId)}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <TouchableOpacity className="items-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
          <Text
            className="mb-2"
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Aún no tienes alumnos
          </Text>
          <Text
            className="mb-4"
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 12,
              color: '#545454',
            }}
          >
            Crea un curso e invita a tus alumnos a unirse
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default StudentsSlide
