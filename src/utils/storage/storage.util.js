import * as SecureStorage from 'expo-secure-store'

const saveSecureData = async (key, value) => {
  await SecureStorage.setItemAsync(key, JSON.stringify(value))
}

const getSecureData = async (key) => {
  const value = await SecureStorage.getItemAsync(key)
  return value !== null ? JSON.parse(value) : null
}

const removeSecureData = async (key) => {
  await SecureStorage.deleteItemAsync(key)
}
export default {
  saveSecureData,
  getSecureData,
  removeSecureData,
}
