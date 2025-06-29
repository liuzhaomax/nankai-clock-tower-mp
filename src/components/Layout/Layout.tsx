import { View } from '@tarojs/components'
import HeaderNav from '@/components/HeaderNav/HeaderNav'
import FooterNav from '@/components/FooterNav/FooterNav'
import styles from './Layout.module.scss'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <View className={styles.layout}>
      <HeaderNav />
      <View>{children}</View>
      <FooterNav />
    </View>
  )
}

export default Layout
