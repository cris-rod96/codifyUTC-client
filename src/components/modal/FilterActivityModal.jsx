import { Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
const FilterActivityModal = ({ openModal, toggleModal, setOptions }) => {
  const { classes } = useSelector((state) => state.teacher)
  const [selectedOptions, setSelectedOptions] = useState({
    classes: [],
    types: [],
  })

  const activities = [
    { id: 'quizz', text: 'Quizz Code' },
    { id: 'lightning', text: 'Lightning Code' },
    { id: 'puzzle', text: 'Puzzle Master' },
    { id: 'brain', text: 'Brain Boost' },
  ]

  const handleActivities = (id) => {
    setSelectedOptions((prevState) => {
      const isSelected = prevState.types.includes(id)
      const updatedTypes = isSelected
        ? prevState.types.filter((type) => type !== id)
        : [...prevState.types, id]

      return { ...prevState, types: updatedTypes }
    })
  }

  const clearOptions = () => {
    setSelectedOptions({ classes: [], types: [] })
  }

  const renderCheckbox = ({ item, type }) => {
    const isSelected =
      type === 'status'
        ? selectedOptions.status.includes(item.id)
        : selectedOptions.types.includes(item.id)

    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
        onPress={() =>
          type === 'status' ? handleStatus(item.id) : handleActivities(item.id)
        }
      >
        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: isSelected ? '#7D1D1D' : 'white',
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}
        >
          {isSelected && <Octicons name="check" size={18} color="white" />}
        </View>
        <Text
          style={{
            marginLeft: 8,
            fontFamily: 'Mulish_700Bold',
            fontSize: 14,
            color: '#202244',
            letterSpacing: 0.2,
          }}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderClassCheckbox = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
        // onPress={() =>
        //   type === 'status' ? handleStatus(item.id) : handleActivities(item.id)
        // }
      >
        <View
          style={{
            width: 28,
            height: 28,
            // backgroundColor: isSelected ? '#7D1D1D' : 'white',
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}
        >
          <Octicons name="check" size={18} color="white" />
        </View>
        <Text
          style={{
            marginLeft: 8,
            fontFamily: 'Mulish_700Bold',
            fontSize: 14,
            color: '#202244',
            letterSpacing: 0.2,
          }}
        >
          {item.topic}
        </Text>
      </TouchableOpacity>
    )
  }

  const applyFilters = () => {
    setOptions(selectedOptions)
    toggleModal()
  }

  useEffect(() => {
    console.log(classes)
  }, [])

  return (
    <Modal
      visible={openModal}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View className="flex-1 bg-[#F5F9FF] px-5 py-3 flex flex-col">
        {/* Header */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-5">
            <TouchableOpacity onPress={toggleModal}>
              <Octicons name="arrow-left" size={30} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 21,
                color: '#202244',
              }}
            >
              Filtros
            </Text>
          </View>
          <TouchableOpacity onPress={clearOptions}>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#545454',
              }}
            >
              Limpiar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View className="mt-8 flex flex-col gap-3 flex-1">
          <View className="flex-1 flex flex-col">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Por clase:
            </Text>

            {/* View de opciones */}
            <FlatList
              data={classes}
              renderItem={({ item }) => renderClassCheckbox({ item })}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View className="mt-5">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Tipo de Actividad:
            </Text>

            {/* View de opciones */}
            <View className="px-5 mt-3">
              <FlatList
                data={activities}
                renderItem={({ item }) =>
                  renderCheckbox({ item, type: 'types' })
                }
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
              />
            </View>
          </View>

          <TouchableOpacity
            className="mt-5 bg-[#741D1D] rounded-full h-[50px] flex items-center justify-center relative"
            onPress={applyFilters}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: 'white',
              }}
            >
              Aplicar
            </Text>
            <Octicons
              name="chevron-right"
              size={25}
              color="white"
              className="absolute right-6"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default FilterActivityModal
