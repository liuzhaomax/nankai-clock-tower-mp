import { ITouchEvent, View } from '@tarojs/components'
import { getStorageSync, redirectTo, useLoad } from '@tarojs/taro'
import Layout from '@/components/Layout/Layout'
import useNavStore from '@/stores/useNavStore'
import { useEffect } from 'react'
import { MODULES, ROUTES, STORAGE_KEY_PLAYER_COUNT } from '@/config/constants'
import { Button } from '@nutui/nutui-react-taro'
import { Player, PlayerBaseInfo, PlayerGameInfo } from '@/config/types'

import styles from './room.module.scss'

const Room: React.FC = () => {
  useLoad(() => {
    console.log('Room loaded.')
  })

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useNavStore()
  useEffect(() => {
    setCurrentModule(MODULES.ROOM)
  }, [])

  // 生成空位
  const playerCount: string = getStorageSync(STORAGE_KEY_PLAYER_COUNT) //TODO 这里应该是返回的数据
  const players: Player[] = []
  const waitings: Player[] = []
  const player: Player = {
    base: {
      id: '123',
      name: '123',
    } as PlayerBaseInfo,
    game: {
      seat: undefined,
      ready: false,
    } as PlayerGameInfo,
  } as Player

  // 坐入空位
  const sit = (event: ITouchEvent): void => {
    // 获取点击的座位index（需要从元素属性获取）
    const target = event.currentTarget as HTMLElement
    const index = Number(target.dataset.index)
    player.game.seat = index
    players.push(player)
    waitings.splice(waitings.indexOf(player), 1)

    console.log(`-------------- 用户点击了座位 ${index} --------------`)
    console.log(`players length ${players.length}`)
    console.log(`waitings length ${waitings.length}`)
  }

  // 开始游戏
  const startGame = () => {
    //TODO 开始游戏请求
    console.log('seat', player.game.seat)
    redirectTo({ url: ROUTES.GAME })
  }

  return (
    <Layout>
      <View className={styles.room}>
        <View className={styles.infoContainer}>
          <View className={styles.infoWrap}>
            <View className={styles.info}>房间ID：12345678</View>
            <View className={styles.info}>房间名称：用户昵称的房间</View>
            <View className={styles.info}>游戏版本：暗流涌动</View>
            <View className={styles.info}>主机昵称：用户昵称</View>
            <View className={styles.info}>房间人数：{playerCount}</View>
          </View>
          <View className={styles.btnWrap}>
            <Button className={styles.btn} type="primary" onClick={startGame}>
              开始游戏
            </Button>
          </View>
        </View>
        <View className={styles.seatWrap}>
          {Array.from({ length: Number(playerCount) }).map((_, index) => (
            <View
              className={styles.seat}
              key={index}
              data-type="seat"
              data-index={index}
              style={
                {
                  '--total': playerCount,
                  '--index': index,
                } as React.CSSProperties
              }
              onClick={sit}
            >
              空
            </View>
          ))}
          {Array.from({ length: Number(playerCount) }).map((_, index) => (
            <View
              className={styles.btnText}
              key={index}
              data-type="btnText"
              data-index={index}
              style={
                {
                  '--total': playerCount,
                  '--index': index,
                } as React.CSSProperties
              }
            >
              {index + 1}
            </View>
          ))}
          <Button className={styles.btn} type="primary">
            准备
          </Button>
        </View>
        <View className={styles.wait}>
          <View className={styles.avatar}>1</View>
          <View className={styles.avatar}>2</View>
          <View className={styles.avatar}>3</View>
          <View className={styles.avatar}>4</View>
          <View className={styles.avatar}>5</View>
          <View className={styles.avatar}>6</View>
          <View className={styles.avatar}>7</View>
          <View className={styles.avatar}>8</View>
          <View className={styles.avatar}>9</View>
          <View className={styles.avatar}>10</View>
          <View className={styles.avatar}>11</View>
          <View className={styles.avatar}>12</View>
          <View className={styles.avatar}>13</View>
          <View className={styles.avatar}>14</View>
          <View className={styles.avatar}>15</View>
        </View>
      </View>
    </Layout>
  )
}

export default Room
