import { redirectTo, useLoad } from '@tarojs/taro'
import Layout from '@/components/Layout/Layout'
import { View } from '@tarojs/components'
import useNavStore from '@/stores/useNavStore'
import { useEffect } from 'react'
import { MODULES, ROUTES } from '@/config/constants'

import styles from './game.module.scss'
import { Button } from '@nutui/nutui-react-taro'

const Game: React.FC = () => {
  useLoad(() => {
    console.log('Game loaded.')
  })

  // 设置当前模块名，用于导航
  const { setCurrentModule } = useNavStore()
  useEffect(() => {
    setCurrentModule(MODULES.GAME)
  }, [])

  return (
    <Layout>
      <View className={styles.game}>
        Game
        <Button
          className={styles.btn}
          type="warning"
          onClick={() => {
            redirectTo({ url: ROUTES.REVIEW })
          }}
        >
          跳转结算
        </Button>
      </View>
    </Layout>
  )
}

export default Game
