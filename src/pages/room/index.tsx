import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './room.scss'

function Room() {
  useLoad(() => {
    console.log('Room loaded.')
  })

  return (
    <View className="nutui-react-demo">
      <View className="room">Room</View>
    </View>
  )
}

export default Room
