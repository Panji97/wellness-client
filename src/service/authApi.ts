import axios from 'axios'

const base_url = `http://localhost:9090`

export interface usersAttributes {
  id?: number
  username: string
  password: string
  access_token?: string
}

export const loginData = async (data: usersAttributes) => {
  try {
    const response = await axios.post(`${base_url}/o/oauth/v1/login`, data)

    return response.data
  } catch (error) {
    return error
  }
}
