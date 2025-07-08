import { useEffect } from 'react'
import { getRoutes } from '@/config/api'
import Taro from '@tarojs/taro'
import { STORAGE_KEY } from '@/config/constants'

import './app.scss'

// 注册拦截器，每次请求都会读取storage拿token放header
Taro.addInterceptor((chain) => {
  const requestParams = chain.requestParams
  const { header = {} } = requestParams

  const token = Taro.getStorageSync(STORAGE_KEY.TOKEN)

  if (token) {
    header['Authorization'] = token
  }

  return chain.proceed({
    ...requestParams,
    header,
  })
})

interface AppProps {
  children?: React.ReactNode
}

const App = (props: AppProps) => {
  const ROUTES = getRoutes()

  useEffect(() => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`BASE_URL: ${ROUTES.BASE_URL}`)
  }, [])

  return props.children
}

export default App
