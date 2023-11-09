import axios from 'axios'
import universalCookie from 'universal-cookie'

const base_url = `http://localhost:9090`
const cookies = new universalCookie()
const accessToken = cookies.get('accessToken')

export const userLogin = async () => {
  try {
    const response = await axios.get(`${base_url}/user/v1/show`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}

export const allUser = async () => {
  try {
    const response = await axios.get(`${base_url}/user/v1/showAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}
