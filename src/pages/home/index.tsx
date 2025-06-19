import { Button } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'
import './home.scss'

function Home() {
  useLoad(() => {
    console.log('Home loaded.')
  })

  const onClickBtn = () => {
    console.log('Clicked on Room')
    navigateTo({ url: '/pages/room/index' })
  }

  return (
    <View className="nutui-react-demo">
      <View className="home">欢迎使用 NutUI React 开发 Taro 多端项目。</View>
      <View className="home">
        <Button type="primary" className="btn" onClick={onClickBtn}>
          NutUI React Button
        </Button>
      </View>
    </View>
  )
}

export default Home
