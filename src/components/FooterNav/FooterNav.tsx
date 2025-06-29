import { Tabbar } from '@nutui/nutui-react-taro'
import { Home, Order, Receipt, Store, User } from '@nutui/icons-react-taro'
import styles from './FooterNav.module.scss'

const FooterNav: React.FC = () => {
  return (
    <Tabbar fixed className={styles.tabbar}>
      <Tabbar.Item title="说明书" icon={<Order />} />
      <Tabbar.Item title="积分榜" icon={<Receipt />} />
      <Tabbar.Item title="首页" icon={<Home />} />
      <Tabbar.Item title="历史对局" icon={<Store />} />
      <Tabbar.Item title="我的" icon={<User />} />
    </Tabbar>
  )
}

export default FooterNav
