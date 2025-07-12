import { Button, Dialog, Radio, Toast } from '@nutui/nutui-react-taro'
import { LogisticsError } from '@nutui/icons-react-taro'
import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import ICP from '@/assets/img/ICP.png'
import Layout from '@/components/Layout/Layout'
import { sleep } from '@/utils/time.ts'
import CreateRoom from '@/pages/home/components/CreateRoom/CreateRoom.tsx'
import useCreateRoomStore from '@/pages/home/stores/useCreateRoomStore.ts'
import JoinRoom from '@/pages/home/components/JoinRoom/JoinRoom.tsx'
import useJoinRoomStore from '@/pages/home/stores/useJoinRoomStore'
import useNavStore from '@/stores/useNavStore'
import useAnimationStore from '@/pages/home/stores/useAnimationStore'
import { MODULES, STORAGE_KEY } from '@/config/constants'
import { getUserUser, login } from '@/pages/home/hooks/auth'
import useUserStore from '@/stores/useUserStore'

import styles from './home.module.scss'

const Home: React.FC = () => {
  useLoad(async () => {
    console.log('Home loaded.')
    await loginSilently()
    await getUser()
    console.log('User loaded.')
  })

  // 静默登录
  const [showReloginDialog, setShowReloginDialog] = useState(false)
  const loginSilently = async (): Promise<void> => {
    if (Taro.getStorageSync(STORAGE_KEY.TOKEN)) return
    try {
      await login()
    } catch (err) {
      console.warn('登录失败', err)
      setShowReloginDialog(true)
    }
  }

  // 获取用户头像昵称（非微信api）
  const { avatar, setAvatar } = useUserStore()
  const { nickName, setNickName } = useUserStore()
  const { setGroups } = useUserStore()
  const getUser = async () => {
    const hasAuth = checkAuth()
    if (!hasAuth) return
    if (avatar && nickName) return
    try {
      const res = await getUserUser()
      setAvatar(res?.avatar)
      setNickName(res?.nickName)
      setGroups(res?.groups)
    } catch (e) {
      console.error(`更新头像昵称失败：${e}`)
      // getUserUser是进入首页就会发送的请求，且需要权限访问，
      // 服务器重启后，此请求必失败，失败则清空storage，再登录刷新token
      Taro.clearStorageSync()
      await login()
    }
  }
  const checkAuth = (): boolean => {
    if (Taro.getStorageSync(STORAGE_KEY.AUTH)) return true
    setShowAuthDialog(true)
    return false
  }

  // 授权
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authRadioChecked, setAuthRadioChecked] = useState(false)
  const [showAuthToast, setShowAuthToast] = useState(false)

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useNavStore()
  useEffect(() => {
    setCurrentModule(MODULES.HOME)
  }, [])

  // 动画 流血 taro3.6不支持 filter: url(#noise) 而且canvas不能锁定345的宽度，自适应无法调整
  // useEffect(() => {
  //   blood()
  // }, [])

  // 动画 蝙蝠
  const { enableBat } = useAnimationStore()
  const [isBatVisible, setIsBatVisible] = useState(true)
  const isMountedRef = useRef(true)
  useEffect(() => {
    runBatAnim()
    return () => {
      isMountedRef.current = false
    }
  }, [])
  const runBatAnim = () => {
    const loop = async () => {
      if (!isMountedRef.current) return
      await sleep(3000) // 3秒后隐藏
      setIsBatVisible(false)
      if (!isMountedRef.current) return
      await sleep(10000) // 10秒后显示
      setIsBatVisible(true)
      await loop()
    }
    loop()
  }
  // 关闭蝙蝠特效
  const { setEnableBat } = useAnimationStore()

  // 创建房间
  const { setShowCreateRoomForm } = useCreateRoomStore()

  const onClickMainBtn = (): void => {
    setShowCreateRoomForm(true)
    setEnableBat(false)
  }

  // 加入房间
  const { setShowJoinRoomForm } = useJoinRoomStore()

  const onClickJoinBtn = (): void => {
    setShowJoinRoomForm(true)
    setEnableBat(false)
  }

  return (
    <Layout>
      <View className={styles.home}>
        <View className={styles.titleWrap}>
          <View className={styles.title}>南开钟楼</View>
          {/*<Canvas className={styles.canvas} id="canvas" canvasId="canvas" type="2d" />*/}
          {/*<svg className={styles.svg}>*/}
          {/*  <filter id="noise">*/}
          {/*    <feTurbulence baseFrequency="0.07" type="fractalNoise" result="turbNoise"></feTurbulence>*/}
          {/*    <feDisplacementMap in="SourceGraphic" in2="turbNoise" xChannelSelector="G" yChannelSelector="B" scale="6" result="disp"></feDisplacementMap>*/}
          {/*  </filter>*/}
          {/*</svg>*/}
        </View>
        {enableBat ? (
          isBatVisible ? (
            <View id="Bat-gif" className={styles.batGif}></View>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <View className={styles.btnWrap}>
          <View className={styles.mainBtnBefore}></View>
          <Button className={styles.mainBtn} type="primary" onClick={onClickMainBtn}>
            创建房间
          </Button>
          <CreateRoom />
        </View>
        <View className={styles.btnWrap}>
          <Button className={styles.joinBtn} type="primary" onClick={onClickJoinBtn}>
            加入房间
          </Button>
          <JoinRoom />
        </View>
        <View className={styles.warnHealth}>
          <p>健康游戏忠告</p>
          <p>抵制不良游戏，拒绝盗版游戏。</p>
          <p>注意自我保护，谨防受骗上当。</p>
          <p>适度游戏益脑，沉迷游戏伤身。</p>
          <p>合理安排时间，享受健康生活。</p>
        </View>
        <View className={styles.icp}>
          <img className={styles.icpImg} src={ICP} alt="ICP" />
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch"
            target="\_blank"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            津ICP备2024011617号-2X
          </a>
        </View>
      </View>
      <Dialog
        className={styles.relogin}
        title="登录失败"
        visible={showReloginDialog}
        closeOnOverlayClick={false}
        onConfirm={async () => {
          await login()
          setShowReloginDialog(false)
        }}
        onCancel={() => setShowReloginDialog(false)}
      >
        {`点击确认，重新登录\n\n或者取消，到“我的”重新登录`}
      </Dialog>
      <Dialog
        className={styles.auth}
        title="用户授权确认"
        visible={showAuthDialog}
        closeOnOverlayClick={false}
        hideCancelButton
        onConfirm={async () => {
          if (!authRadioChecked) {
            setShowAuthToast(true)
            return
          }
          Taro.setStorageSync(STORAGE_KEY.AUTH, '1')
          await getUser()
          setShowAuthDialog(false)
        }}
      >
        {`您同意我们将您的头像用于识别用户和展示个人信息功能，并允许公开访问。\n\n点击确认，进行授权\n\n`}
        <Radio checked={authRadioChecked} onChange={() => setAuthRadioChecked(true)}>
          我已阅读并同意上述内容
        </Radio>
      </Dialog>
      <Toast
        content="请阅读并同意授权"
        duration={2}
        icon={<LogisticsError />}
        title="未授权"
        visible={showAuthToast}
        onClose={() => setShowAuthToast(false)}
      />
    </Layout>
  )
}

export default Home
