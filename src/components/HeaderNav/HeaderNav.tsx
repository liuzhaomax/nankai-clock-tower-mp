import { NavBar } from '@nutui/nutui-react-taro'
import { Home, Refresh } from '@nutui/icons-react-taro'
import { navigateTo } from '@tarojs/taro'
import { MODULES, ROUTES } from '@/config/constants'
import { View } from '@tarojs/components'
import styles from './HeaderNav.module.scss'
import useTargetModuleStore from '@/stores/useCurrentModule'

const HeaderNav: React.FC = () => {
  const { currentModule } = useTargetModuleStore()

  const clickBack = () => {
    switch (currentModule) {
      case MODULES.HOME:
        return navigateTo({ url: ROUTES.HOME })
      case MODULES.ROOM:
        return navigateTo({ url: ROUTES.HOME })
      case MODULES.GAME:
        return navigateTo({ url: ROUTES.HOME })
      case MODULES.REVIEW:
        return navigateTo({ url: ROUTES.ROOM })
      default:
        return navigateTo({ url: ROUTES.HOME })
    }
  }

  return (
    <NavBar
      className={styles.navBar}
      back={currentModule === MODULES.HOME ? <></> : <Home className={styles.back} size={25} />}
      onBackClick={clickBack}
    >
      <Refresh className={styles.refresh} />
      <View className={styles.title}>首页</View>
    </NavBar>
  )
}

export default HeaderNav
