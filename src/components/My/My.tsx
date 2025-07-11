import styles from './My.module.scss'
import { Avatar, Button, Input, Popup } from '@nutui/nutui-react-taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import useAnimationStore from '@/pages/home/stores/useAnimationStore'
import { User } from '@nutui/icons-react-taro'
import { login } from '@/pages/home/hooks/auth'
import { patchNickName, postAvatar } from '@/components/My/hooks/user'
import useUserStore from '@/stores/useUserStore'
import { STORAGE_KEY } from '@/config/constants'
import Taro from '@tarojs/taro'

const My: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true)

  const closePopup = (): void => setShowPopup(false)

  const { setEnableBat } = useAnimationStore()
  useEffect(() => {
    setEnableBat(false)
  }, [])

  // 静默登录
  useEffect(() => {
    loginSilently()
  }, [])
  const loginSilently = async (): Promise<void> => {
    if (Taro.getStorageSync(STORAGE_KEY.TOKEN)) return
    try {
      await login()
    } catch (err) {
      console.warn('登录失败', err)
    }
  }

  // 更新头像昵称
  const { avatar, setAvatar } = useUserStore()
  const onAvatarChange = async (avatarSrc: string) => {
    try {
      const res = await postAvatar(avatarSrc)
      setAvatar(res?.avatar)
    } catch (e) {
      console.error(`更新头像失败：${e}`)
    }
  }
  const { nickName, setNickName } = useUserStore()
  const [nickNameState, setNickNameState] = useState('') // 防止设置与更新时相同也发请求
  const onNickNameChange = async (nickname: string) => {
    try {
      if (nickname.trim() && nickname.trim() !== nickName) {
        const res = await patchNickName(nickname)
        setNickName(res?.nickName)
      }
    } catch (e) {
      console.error(`更新昵称失败：${e}`)
    }
  }
  useEffect(() => {
    if (nickName) setNickNameState(nickName)
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
      <View className={styles.container}>
        <View className={styles.top}>
          <Button
            className={styles.avatarWrap}
            openType="chooseAvatar"
            block
            onChooseAvatar={(e) => {
              const { avatarUrl } = e.detail
              onAvatarChange(avatarUrl)
            }}
          >
            <Avatar
              icon={avatar ? <></> : <User className={styles.avatarIcon} />}
              size="120"
              src={avatar}
            />
          </Button>
          <Input
            className={styles.nickName}
            type="nickname"
            placeholder="请输入昵称"
            align="center"
            value={nickNameState}
            onChange={(val) => setNickNameState(val)}
            onBlur={onNickNameChange}
          />
        </View>
        <View className={styles.center}></View>
        <View className={styles.bottom}></View>
      </View>
    </Popup>
  )
}

export default My
