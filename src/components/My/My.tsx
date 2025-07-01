import styles from './My.module.scss'
import { Popup } from '@nutui/nutui-react-taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import useAnimationStore from '@/pages/home/stores/useAnimationStore'

const My: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true)

  const closePopup = (): void => setShowPopup(false)

  const { setEnableBat } = useAnimationStore()
  useEffect(() => {
    setEnableBat(false)
  }, [])

  return (
    <Popup
      className={styles.popup}
      position="top"
      round
      overlay={false}
      visible={showPopup}
      onClose={closePopup}
    >
      <View className={styles.title}>我的</View>
      <View className={styles.container}>我的</View>
    </Popup>
  )
}

export default My
