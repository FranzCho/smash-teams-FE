import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getCookie } from '../utils/cookies'

const getAxiosInstance = (option?: { multi?: boolean }) => {
  // axios의 기본 설정을 한다.

  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // CORS 문제 해결
    },
    withCredentials: true,
  }

  const instance = axios.create(config)
  // 3초 이상 응답이 없으면 에러를 발생시킨다.
  instance.defaults.timeout = 3000
  // 지금 로그인한 사용자의 토큰을 가져와서 헤더에 넣어준다.
  instance.interceptors.request.use(
    (request) => {
      const token = getCookie('accessToken')
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
      }
      if (option && option.multi) request.headers['Content-Type'] = 'multipart/form-data'

      return request
    },
    // 요청이 실패하면 에러를 발생시킨다.
    (error: AxiosError) => {
      console.log(error)
      return Promise.reject(error)
    },
  )

  return instance
}

export const axiosInstance = getAxiosInstance
