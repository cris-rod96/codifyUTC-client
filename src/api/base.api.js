import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://codifyutc-server.onrender.com/api/v1',
})
