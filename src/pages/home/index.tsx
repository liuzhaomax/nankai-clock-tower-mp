import { Button } from '@nutui/nutui-react-taro'
import { Canvas, View } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'

import { PAGES } from '@/config/constants.ts'

import styles from './home.module.scss'
import { useEffect, useRef, useState } from 'react'
import { blood } from '@/utils/blood/blood.ts'
import bat from '@/assets/video/bat.gif'
import ICP from '@/assets/img/ICP.png'
import { sleep } from '@/utils/time.ts'

function Home() {
  useLoad(() => {
    console.log('Home loaded.')
  })

  const onClickMainBtn = () => {
    console.log('Clicked on Room')
    navigateTo({ url: `/${PAGES.ROOM}` })
  }

  // 动画 流血
  useEffect(() => {
    blood()
  }, [])

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
      loop()
    }
    loop()
  }

  return (
    <View className={styles.home}>
      <View id="Title-wrap" className={styles.titleWrap}>
        <View className={styles.title}>南开钟楼</View>
        <Canvas canvasId="canvas-blood" style={{ width: '100vw', height: '100px' }} />
      </View>
      {isBatVisible ? (
        <img id="Bat-gif" className={styles.batGif} src={bat} alt="Bat GIF" />
      ) : (
        <></>
      )}
      <View className={styles.mainBtnWrap}>
        <View className={styles.mainBtnBefore}></View>
        <Button className={styles.mainBtn} type="primary" onClick={onClickMainBtn}>
          创建房间
        </Button>
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
  )
}

export default Home
