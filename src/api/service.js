import axios from 'axios'

const service = axios.create()

service.interceptors.response.use(
  async response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export function request (config) {
  let configDefault = {
    timeout: 60000,
    baseURL: 'https://gitee.com/fairyever/wdbc-awesome/raw/master',
    data: {}
  }
  return service(Object.assign(configDefault, config))
}
