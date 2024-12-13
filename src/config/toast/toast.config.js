import Toast, {
  BaseToast,
  SuccessToast,
  ErrorToast,
} from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons' // Asegúrate de tener Ionicons importado

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      style={{
        borderLeftColor: 'green',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: 'Jost_700Bold',
        fontSize: 15,
        fontWeight: '400',
        color: '#202244', // Cambié el color para que el texto sea visible
      }}
      text2Style={{
        fontFamily: 'Mulish_600SemiBold',
        fontSize: 12,
        fontWeight: '300',
        color: '#202244',
      }}
      // Agregar icono al lado izquierdo del toast
      leadingIcon={() => (
        <Ionicons
          name="checkmark-circle-outline"
          size={24}
          color="white"
          style={{ marginRight: 10 }} // Espaciado entre el ícono y el texto
        />
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: 'Jost_700Bold',
        fontSize: 15,
        fontWeight: '400',
        color: '#202244', // Cambié el color para que el texto sea visible
      }}
      text2Style={{
        fontFamily: 'Mulish_600SemiBold',
        fontSize: 12,
        fontWeight: '300',
        color: '#202244',
      }}
      // Agregar icono al lado izquierdo del toast
      leadingIcon={() => (
        <Ionicons
          name="close-circle-sharp"
          size={24}
          color="white"
          style={{ marginRight: 10 }} // Espaciado entre el ícono y el texto
        />
      )}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#5676ff',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: 'Mulish_600SemiBold',
        fontSize: 12,
        fontWeight: '300',
        color: '#202244', // Cambié el color para que el texto sea visible
      }}
      // Agregar icono al lado izquierdo del toast
      leadingIcon={() => (
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="white"
          style={{ marginRight: 10 }} // Espaciado entre el ícono y el texto
        />
      )}
    />
  ),
}

export default toastConfig
