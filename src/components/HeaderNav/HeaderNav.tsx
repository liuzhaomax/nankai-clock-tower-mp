import { Home, Refresh, ArrowLeft, Store } from '@nutui/icons-react-taro'
import { redirectTo, navigateBack } from '@tarojs/taro'
import { MODULES, ROUTES } from '@/config/constants'
import { View } from '@tarojs/components'
import styles from './HeaderNav.module.scss'
import useNavStore from '@/stores/useNavStore'

const HeaderNav: React.FC = () => {
  const { currentModule } = useNavStore()

  const genBackIcon = () => {
    switch (currentModule) {
      case MODULES.HOME:
        return <></>
      case MODULES.ROOM:
        return (
          <View className={styles.back} onClick={clickBack}>
            <Home size={25} />
          </View>
        )
      case MODULES.GAME:
        return (
          <View className={styles.back} onClick={clickBack}>
            <Home size={25} />
          </View>
        )
      case MODULES.REVIEW:
        return (
          <View className={styles.back} onClick={clickBack}>
            <Store size={25} />
          </View>
        )
      default:
        return <ArrowLeft className={styles.back} size={25} />
    }
  }

  const clickBack = () => {
    switch (currentModule) {
      case MODULES.HOME:
        redirectTo({ url: ROUTES.HOME })
        return
      case MODULES.ROOM:
        redirectTo({ url: ROUTES.HOME })
        return
      case MODULES.GAME:
        redirectTo({ url: ROUTES.HOME })
        return
      case MODULES.REVIEW:
        redirectTo({ url: ROUTES.ROOM })
        return
      default:
        navigateBack()
        return
    }
  }

  const genTitle = (): string => {
    switch (currentModule) {
      case MODULES.HOME:
        return '首页'
      case MODULES.ROOM:
        return '房间中'
      case MODULES.GAME:
        return '游戏中'
      case MODULES.REVIEW:
        return '结算中'
      default:
        return ''
    }
  }

  //TODO 点击refresh重新获取数据 - 防抖

  return (
    <View className={styles.navBar}>
      {genBackIcon()}
      {currentModule === MODULES.HOME ? <></> : <Refresh className={styles.refresh} />}
      <View className={styles.title}>{genTitle()}</View>
    </View>
  )
}

export default HeaderNav
