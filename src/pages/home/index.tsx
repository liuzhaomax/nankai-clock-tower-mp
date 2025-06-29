import { Button } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import ICP from '@/assets/img/ICP.png'
import Layout from '@/components/Layout/Layout'
import { sleep } from '@/utils/time.ts'
import CreateRoom from '@/pages/home/components/CreateRoom/CreateRoom.tsx'
import useCreateRoomStore from '@/pages/home/stores/useCreateRoom.ts'
import useTargetModuleStore from '@/stores/useCurrentModule'
import { MODULES } from '@/config/constants'

import styles from './home.module.scss'

const Home: React.FC = () => {
  useLoad(() => {
    console.log('Home loaded.')
  })

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useTargetModuleStore()
  useEffect(() => {
    setCurrentModule(MODULES.HOME)
  }, [])

  // 动画 流血 taro3.6不支持 filter: url(#noise) 而且canvas不能锁定345的宽度，自适应无法调整
  // useEffect(() => {
  //   blood()
  // }, [])

  // 动画 蝙蝠
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

  // 创建房间
  const { setShowCreateRoomForm } = useCreateRoomStore()

  const onClickMainBtn = () => {
    setShowCreateRoomForm(true)
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
        {isBatVisible ? <View id="Bat-gif" className={styles.batGif}></View> : <></>}
        <View className={styles.mainBtnWrap}>
          <View className={styles.mainBtnBefore}></View>
          <Button className={styles.mainBtn} type="primary" onClick={onClickMainBtn}>
            创建房间
          </Button>
          <CreateRoom />
        </View>
        <Button className={styles.joinBtn} type="primary" onClick={onClickMainBtn}>
          加入房间
        </Button>
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
    </Layout>
  )
}

export default Home
