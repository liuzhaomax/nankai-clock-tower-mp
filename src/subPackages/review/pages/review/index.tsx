import { useLoad } from '@tarojs/taro'
import Layout from '@/components/Layout/Layout'
import { View } from '@tarojs/components'
import useNavStore from '@/stores/useNavStore'
import { useEffect } from 'react'
import { MODULES } from '@/config/constants'

import styles from './review.module.scss'

const Review: React.FC = () => {
  useLoad(() => {
    console.log('Review loaded.')
  })

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useNavStore()
  useEffect(() => {
    setCurrentModule(MODULES.REVIEW)
  }, [])

  return (
    <Layout>
      <View className={styles.review}>Review</View>
    </Layout>
  )
}

export default Review
