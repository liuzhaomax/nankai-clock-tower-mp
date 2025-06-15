import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import bjx from '../../assets/img/jx.jpg'
import styles from './index.scss'

const Index = () => {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className={styles.index}>
      <Text className={styles.text}>靖鑫加油啊，你是最棒的！！！</Text>
      <Image
        className={styles.img}
        src={bjx}
        mode="aspectFit"
        style="width: 100%;height: 600px;background: #fff;"
      />
    </View>
  )
}

export default Index
