import { NavBar } from '@nutui/nutui-react-taro'
import { Home, Refresh, ArrowLeft, Store } from '@nutui/icons-react-taro'
import { navigateTo, navigateBack } from '@tarojs/taro'
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
        return <Home className={styles.back} size={25} />
      case MODULES.GAME:
        return <Home className={styles.back} size={25} />
      case MODULES.REVIEW:
        return <Store className={styles.back} size={25} />
      default:
        return <ArrowLeft className={styles.back} size={25} />
    }
  }

  const clickBack = () => {
    switch (currentModule) {
      case MODULES.HOME:
        navigateTo({ url: ROUTES.HOME })
        return
      case MODULES.ROOM:
        navigateTo({ url: ROUTES.HOME })
        return
      case MODULES.GAME:
        navigateTo({ url: ROUTES.HOME })
        return
      case MODULES.REVIEW:
        navigateTo({ url: ROUTES.ROOM })
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
    <NavBar className={styles.navBar} back={genBackIcon()} onBackClick={clickBack}>
      {currentModule === MODULES.HOME ? <></> : <Refresh className={styles.refresh} />}
      <View className={styles.title}>{genTitle()}</View>
    </NavBar>
  )
}

export default HeaderNav
