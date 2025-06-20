import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import styles from './room.module.scss'

function Room() {
  useLoad(() => {
    console.log('Room loaded.')
  })

  return <View className={styles.room}>Room</View>
}

export default Room
