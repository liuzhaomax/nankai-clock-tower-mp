import styles from './Specification.module.scss'
import { Popup } from '@nutui/nutui-react-taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import useAnimationStore from '@/pages/home/stores/useAnimationStore'

const Specification: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true)

  const closePopup = (): void => setShowPopup(false)

  const { setEnableBat } = useAnimationStore()
  useEffect(() => {
    setEnableBat(false)
    return () => {
      setEnableBat(true)
    }
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
      <View className={styles.title}>说明书</View>
      <View className={styles.container}>说明书</View>
    </Popup>
  )
}

export default Specification
