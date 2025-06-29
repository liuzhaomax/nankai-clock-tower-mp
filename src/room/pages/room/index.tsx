import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Layout from '@/components/Layout/Layout'
import useTargetModuleStore from '@/stores/useCurrentModule'
import { useEffect } from 'react'
import { MODULES } from '@/config/constants'

import styles from './room.module.scss'

const Room: React.FC = () => {
  useLoad(() => {
    console.log('Room loaded.')
  })

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useTargetModuleStore()
  useEffect(() => {
    setCurrentModule(MODULES.ROOM)
  }, [])

  return (
    <Layout>
      <View className={styles.room}>Room</View>
    </Layout>
  )
}

export default Room
