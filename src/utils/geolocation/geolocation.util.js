import axios from 'axios'

const getPublicIp = async () => {
  const response = await axios.get('https://api.ipify.org?format=json')
  return response.data.ip
}

const getLoginLocation = async () => {
  const ip = await getPublicIp()
  const response = await axios.get(
    `https://ipinfo.io/${ip}?token=76b497b2b53abb`
  )
  const { city } = response.data

  return { city, ip }
}

export default { getLoginLocation }
