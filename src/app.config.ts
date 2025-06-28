import { PAGES } from '@/config/constants.ts'

export default defineAppConfig({
  pages: [PAGES.HOME],
  subPackages: [
    {
      root: 'room',
      pages: [PAGES.ROOM],
    },
    {
      root: 'game',
      pages: [PAGES.GAME],
    },
    {
      root: 'review',
      pages: [PAGES.REVIEW],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom', // 隐藏默认导航栏
  },
})
