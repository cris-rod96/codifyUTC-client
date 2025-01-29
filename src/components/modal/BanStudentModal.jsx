import { Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { courseStudentsAPI } from 'api/index.api'
const BanStudentModal = ({
  visible,
  onClose,
  student_id,
  student_name,
  course_name,
  course_id,
  student_email,
  teacher_name,
  onContinue,
}) => {
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')

  const handleChangeText = (value) => {
    const reasonValid = value.split(' ').length > 5
    setIsValid(reasonValid)
    setReason(value)
  }

  const banStudent = () => {
    setLoading(true)
    courseStudentsAPI
      .bannedStudent({
        course_id,
        student_id,
        course_name,
        reason,
        teacher_name,
        student_name,
        student_email,
      })
      .then((res) => {
        onContinue(true)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClose = () => {
    setIsValid(false)
    setLoading(false)
    setReason('')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View className="flex-1 bg-black/80 px-10 flex justify-center items-center">
        <View className="w-full bg-white rounded-lg border border-gray-200  pb-5 fkex flex-col">
          {/* Header */}
          <View className="flex flex-row items-center justify-between px-5 mb-3 py-3 border-b border-gray-200">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Banear Alumno
            </Text>

            <TouchableOpacity onPress={handleClose}>
              <Octicons name="x" size={21} color={'#741D1D'} />
            </TouchableOpacity>
          </View>

          {/* Question */}
          <View className="flex flex-col w-full mb-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: '#741d1d',
                textAlign: 'center',
              }}
            >
              {`¿Realmente deseas eliminar a ${student_name} de ${course_name}?`}
            </Text>
          </View>

          <View className="mx-3 flex flex-col gap-2">
            <TextInput
              multiline={true}
              className="bg-[#F5F9FF] border border-gray-200 h-[100px] px-3 rounded-lg"
              textAlignVertical="top"
              placeholder="Justifica tu decisión (más de 5 palabras)"
              value={reason}
              onChangeText={(value) => handleChangeText(value)}
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#202244',
              }}
            />

            <TouchableOpacity
              className="w-full py-3 flex flex-row justify-center items-center gap-2  rounded-lg"
              disabled={!isValid}
              style={{
                backgroundColor: isValid && !loading ? '#741D1D' : '#888',
              }}
              onPress={banStudent}
            >
              {loading ? (
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  Eliminando
                </Text>
              ) : (
                <>
                  <Octicons name="trash" size={18} color={'white'} />
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Eliminar
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default BanStudentModal
