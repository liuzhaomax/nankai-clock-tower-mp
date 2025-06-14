import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

const Index = () => {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className="index">
      <Text>靖鑫加油啊，你是最棒的！！！</Text>
    </View>
  )
}

export default Index
