import axios from 'axios'
import universalCookie from 'universal-cookie'

export interface EVENT_PROPS {
  id?: string
  company?: string
  name?: string
  date1?: Date
  date2?: Date
  date3?: Date
  date?: Date[]
  status?: 'approve' | 'reject' | null
  remark?: string
  location?: string
  _vendor?: string
}

const base_url = `http://localhost:9090`
const cookies = new universalCookie()
const accessToken = cookies.get('accessToken')

export const showEvent = async () => {
  try {
    const response = await axios.get(`${base_url}/event/v1/show`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}

export const createEvent = async (data: EVENT_PROPS) => {
  try {
    const response = await axios.post(`${base_url}/event/v1/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}

export const editEvent = async (data: EVENT_PROPS) => {
  try {
    const response = await axios.put(`${base_url}/event/v1/update/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}

export const deleteEvent = async (data: EVENT_PROPS) => {
  try {
    const response = await axios.delete(`${base_url}/event/v1/delete/${data.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}
