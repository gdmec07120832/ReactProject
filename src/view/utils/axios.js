import Axios from 'axios'

const pending = []

const instance = Axios.create({
  baseURL: '/bi-dm',
  timeout: 60 * 1000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

instance.interceptors.request.use(config => {
    config.cancelToken = new Axios.CancelToken(c => {
      pending.push(c)
    })
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(   //响应拦截器
    response => {
      const {data, config: {failedTip}} = response
      if(data) {
        if(data.success) {
          return Promise.resolve(data)
        } else {
          if(failedTip !== false) {
            // Notify({
            //   type: 'danger',
            //   message: data?.msg || '接口错误'
            // })
            console.log('axios错误信息：'+(data?.msg || '接口错误'));
          }
          return Promise.reject(data)
        }
      }
      console.warn(`${response.config.url}出现错误`)
      return Promise.reject('接口错误')
    },
    error => {
      return Promise.reject(error)
    }
)

export default instance
export {instance as $axios}