import { useEffect } from 'react'
// import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
// import '@nutui/nutui-react-taro/dist/styles/theme-default.scss'
import './app.scss'

interface AppProps {
  children?: React.ReactNode
}

const App = (props: AppProps) => {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`BASE_URL: ${process.env.BASE_URL}`)
  }, [])

  // // 对应 onShow
  // useDidShow(() => {})
  //
  // // 对应 onHide
  // useDidHide(() => {})

  return props.children
}

export default App
