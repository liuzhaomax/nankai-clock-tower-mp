import { MODULES, PAGES } from '@/config/constants.ts'

export default defineAppConfig({
  pages: [PAGES.HOME],
  subPackages: [
    {
      root: MODULES.ROOM,
      pages: [PAGES.ROOM],
    },
    {
      root: MODULES.GAME,
      pages: [PAGES.GAME],
    },
    {
      root: MODULES.REVIEW,
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
  lazyCodeLoading: 'requiredComponents', // 打开懒加载
})
