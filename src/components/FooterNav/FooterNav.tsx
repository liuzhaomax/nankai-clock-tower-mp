import { Tabbar } from '@nutui/nutui-react-taro'
import { Order, BellRing, User, Book, Calendar } from '@nutui/icons-react-taro'
import styles from './FooterNav.module.scss'

const FooterNav: React.FC = () => {
  return (
    <Tabbar fixed className={styles.tabbar}>
      <Tabbar.Item title="说明书" icon={<Book />} />
      <Tabbar.Item title="积分榜" icon={<Order />} />
      <Tabbar.Item title="钟楼" icon={<BellRing />} />
      <Tabbar.Item title="历史对局" icon={<Calendar />} />
      <Tabbar.Item title="我的" icon={<User />} />
    </Tabbar>
  )
}

export default FooterNav
