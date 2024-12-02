import * as SecureStorage from 'expo-secure-store'

const saveSecureData = async (key, value) => {
  await SecureStorage.setItemAsync(key, value)
}

const getSecureData = async (key) => {
  const value = await SecureStorage.getItemAsync(key)
  return value
}

const removeSecureData = async (key) => {
  const value = await SecureStorage.deleteItemAsync(key)
  return value
}

export default {
  saveSecureData,
  getSecureData,
  removeSecureData,
}
