import { NavBar } from '@nutui/nutui-react-taro'
import { Home } from '@nutui/icons-react-taro'
import { navigateTo } from '@tarojs/taro'
import { ROUTES } from '@/config/constants'
import { View } from '@tarojs/components'
import styles from './HeaderNav.module.scss'

interface HeaderNavProps {
  hideBack?: boolean
  goTo?: string
}

const HeaderNav: React.FC<HeaderNavProps> = ({ hideBack, goTo }: HeaderNavProps) => {
  const clickBack = () => {
    switch (goTo) {
      case 'home':
        return navigateTo({ url: ROUTES.HOME })
      case 'room':
        return navigateTo({ url: ROUTES.ROOM })
      default:
        return navigateTo({ url: ROUTES.HOME })
    }
  }

  return (
    <NavBar
      className={styles.navBar}
      back={hideBack ? <></> : <Home className={styles.back} size={25} />}
      onBackClick={clickBack}
    >
      <View className={styles.title}>首页</View>
    </NavBar>
  )
}

export default HeaderNav
