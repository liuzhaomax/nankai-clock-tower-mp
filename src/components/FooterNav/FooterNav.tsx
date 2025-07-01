import { Tabbar } from '@nutui/nutui-react-taro'
import { Order, BellRing, User, Book, Calendar } from '@nutui/icons-react-taro'
import styles from './FooterNav.module.scss'
import Specification from '@/components/Specification/Specification'
import Ranking from '@/components/Ranking/Ranking'
import History from '@/components/History/History'
import My from '@/components/My/My'
import { useState } from 'react'

const FooterNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState(2)

  const handleTabSwitch = (value: number): void => {
    setActiveTab(value)
  }

  const popup = () => {
    switch (activeTab) {
      case 0:
        return <Specification />
      case 1:
        return <Ranking />
      case 2:
        return <></>
      case 3:
        return <History />
      case 4:
        return <My />
      default:
        return <></>
    }
  }

  return (
    <>
      <Tabbar className={styles.tabbar} fixed value={activeTab} onSwitch={handleTabSwitch}>
        <Tabbar.Item title="说明书" icon={<Book />} />
        <Tabbar.Item title="积分榜" icon={<Order />} />
        <Tabbar.Item title="钟楼" icon={<BellRing />} />
        <Tabbar.Item title="历史对局" icon={<Calendar />} />
        <Tabbar.Item title="我的" icon={<User />} />
      </Tabbar>
      {popup()}
    </>
  )
}

export default FooterNav
