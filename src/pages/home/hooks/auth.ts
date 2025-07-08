import Taro from '@tarojs/taro'
import { STORAGE_KEY } from '@/config/constants'
import { getRoutes } from '@/config/api'

const ROUTES = getRoutes()

// 步骤1：获取code
const getWxCode = async (): Promise<string> => {
  const { code } = await Taro.login()
  return code
}

// 步骤2：检查授权状态
const checkAuth = async (): Promise<boolean> => {
  const { authSetting } = await Taro.getSetting()
  return !!authSetting['scope.userInfo']
}

// 步骤3：发送到开发者服务器
const sendToServer = async (code: string) => {
  const { data } = await Taro.request({
    url: `${ROUTES.BASE_URL}/login`,
    method: 'POST',
    data: { code },
  })
  return data // token
}

// 完整登录流程
export const login = async (): Promise<void> => {
  // 1. 检查本地token
  const token = Taro.getStorageSync(STORAGE_KEY.TOKEN)
  if (token) return

  // 2. 获取微信code
  const code = await getWxCode()

  // 3. 检查授权状态
  const isAuthed = await checkAuth()
  if (!isAuthed) {
    console.warn(new Error('需要用户主动授权'))
    return
  }

  // 4. 发送到服务端
  const serverData = await sendToServer(code)
  if (!serverData) return
  console.log(serverData)

  // 5. 存储登录态
  Taro.setStorageSync(STORAGE_KEY.TOKEN, serverData.token)

  return
}

// export const logout = (): void => {
//   Taro.removeStorageSync(STORAGE_KEY.TOKEN)
// }
