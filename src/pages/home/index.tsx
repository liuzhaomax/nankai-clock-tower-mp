import { Button } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'

import { PAGES } from '@/config/constants.ts'

import styles from './home.module.scss'

function Home() {
  useLoad(() => {
    console.log('Home loaded.')
  })

  const onClickMainBtn = () => {
    console.log('Clicked on Room')
    navigateTo({ url: `/${PAGES.ROOM}` })
  }

  return (
    <View className={styles.home}>
      <View className={styles.titleWrap}>
        <View className={styles.title}>南开钟楼</View>
      </View>
      <Button className={styles.mainBtn} type="primary" onClick={onClickMainBtn}>
        创建房间
      </Button>
    </View>
  )
}

export default Home
