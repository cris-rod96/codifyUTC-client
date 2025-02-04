import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://codifyutc-server.onrender.com/api/v1',
  // baseURL: 'http://192.168.1.124:3000/api/v1',
})
