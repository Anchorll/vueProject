import Axios from 'axios'
import {
  Message
} from 'element-ui'
import Qs from 'qs'
import vue from '@/main'
let host = ''
const frontHost = ''

const axios = Axios.create({
  timeout: 180000,
  responseType: 'json',
  withCredentials: false,
  paramsSerializer: params => Qs.stringify(params, {
    arrayFormat: 'repeat'
  }),
  baseURL: '/api'
})
axios.interceptors.request.use(config => {
  
  return config
})
axios.interceptors.response.use(
  data => {
    if (data.data) {
      let code = data.data.code
      if (code && code !== 200 && code !== 403) {
        Message.error({
          message: data.data.message
        })
        return Promise.reject(data)
      }
    }
    return data
  },
  async error => {

  }
)
export default {
  host,
  frontHost,
  axios
}
