import { Button } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'

import { PAGES } from '@/config/constants.ts'

import styles from './home.module.scss'

function Home() {
  useLoad(() => {
    console.log('Home loaded.')
  })

  const onClickBtn = () => {
    console.log('Clicked on Room')
    navigateTo({ url: `/${PAGES.ROOM}` })
  }

  return (
    <View className={styles.home}>
      <Button className={styles.btn} type="primary" onClick={onClickBtn}>
        创建房间
      </Button>
    </View>
  )
}

export default Home
