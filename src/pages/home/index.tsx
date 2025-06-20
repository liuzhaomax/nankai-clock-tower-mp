import { Button } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'

import styles from './home.module.scss'

function Home() {
  useLoad(() => {
    console.log('Home loaded.')
  })

  const onClickBtn = () => {
    console.log('Clicked on Room')
    navigateTo({ url: '/pages/room/index' })
  }

  return (
    <View className={styles.home}>
      <Button className={styles.btn} type="primary" onClick={onClickBtn}>
        NutUI React Button
      </Button>
    </View>
  )
}

export default Home
