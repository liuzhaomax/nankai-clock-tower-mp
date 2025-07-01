import { MODULES, PAGES, SUB_PACKAGES } from '@/config/constants.ts'

export default defineAppConfig({
  pages: [PAGES.HOME],
  subPackages: [
    {
      root: `${SUB_PACKAGES}/${MODULES.ROOM}`,
      pages: [PAGES.ROOM],
    },
    {
      root: `${SUB_PACKAGES}/${MODULES.GAME}`,
      pages: [PAGES.GAME],
    },
    {
      root: `${SUB_PACKAGES}/${MODULES.REVIEW}`,
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
