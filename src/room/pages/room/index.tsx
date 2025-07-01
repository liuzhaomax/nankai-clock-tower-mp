import { View } from '@tarojs/components'
import { navigateTo, useLoad } from '@tarojs/taro'
import Layout from '@/components/Layout/Layout'
import useNavStore from '@/stores/useNavStore'
import { useEffect } from 'react'
import { MODULES, ROUTES } from '@/config/constants'

import styles from './room.module.scss'
import { Button } from '@nutui/nutui-react-taro'

const Room: React.FC = () => {
  useLoad(() => {
    console.log('Room loaded.')
  })

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useNavStore()
  useEffect(() => {
    setCurrentModule(MODULES.ROOM)
  }, [])

  return (
    <Layout>
      <View className={styles.room}>
        Room
        <Button
          type="primary"
          onClick={() => {
            navigateTo({ url: ROUTES.HOME })
          }}
        ></Button>
      </View>
    </Layout>
  )
}

export default Room
