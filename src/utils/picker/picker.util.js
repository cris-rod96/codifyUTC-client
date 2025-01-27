import * as ImagePicker from 'expo-image-picker'

const requestPermission = async (type) => {
  let permission = null
  if (type === 'mediaLibrary') {
    permission = await ImagePicker.getMediaLibraryPermissionsAsync()
  }

  if (type === 'camera') {
    permission = await ImagePicker.getCameraPermissionsAsync()
  }

  if (permission.status === 'granted') return true

  const { status } = await (type === 'mediaLibrary'
    ? ImagePicker.requestMediaLibraryPermissionsAsync()
    : ImagePicker.requestCameraPermissionsAsync())

  if (status !== 'granted') {
    alert(
      'Permiso denegado',
      `Necesitamos acceso a tu ${
        type === 'camera' ? 'cámara' : 'galeria'
      } para continuar.`
    )
    return false
  }
  return true
}

const pickImageFromGalllery = async () => {
  const hasPermission = await requestPermission('mediaLibrary')
  if (!hasPermission) return null

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  })

  if (!result.canceled) {
    return result.assets[0].uri
  }
  return null
}

const takePhotoWithCamera = async () => {
  const hasPermission = await requestPermission('camera')
  if (!hasPermission) return null

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
  })

  if (!result.canceled) {
    return result.assets[0].uri
  }
  return null
}

export default {
  pickImageFromGalllery,
  takePhotoWithCamera,
}
