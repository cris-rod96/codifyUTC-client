import { useLayoutEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import {
  ActivitiesByCourse,
  ClassesByCourse,
  StudentsByCourse,
} from 'views/index.views'

function CourseTabs({ route, navigation }) {
  const layout = useWindowDimensions()
  const { course } = route.params || {}

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'classes', title: 'Clases' },
    { key: 'activities', title: 'Actividades' },
    { key: 'students', title: 'Estudiantes' },
  ])

  useLayoutEffect(() => {
    if (course) {
      navigation.setOptions({
        title: `${course.subject}`,
      })
    }
  }, [course, navigation])

  const renderScene = SceneMap({
    classes: () => <ClassesByCourse courseId={course?.id} />,
    activities: () => <ActivitiesByCourse courseId={course?.id} />,
    students: () => <StudentsByCourse courseId={course?.id} />,
  })
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{ backgroundColor: '#F5F9FF' }}
      sceneContainerStyle={{ backgroundColor: '#F5F9FF' }}
      swipeEnabled={false}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{
            backgroundColor: '#741D1D', // Color de fondo de la barra de pestañas
            borderBottomWidth: 0, // Quitar borde inferior si lo deseas
          }}
          inactiveColor="#DCDCDC"
          activeColor="#FFF"
          indicatorStyle={{
            backgroundColor: '#741D1D', // Color de la indicador de la pestaña activa
          }}
        />
      )}
    />
  )
}

export default CourseTabs
