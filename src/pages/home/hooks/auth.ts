import Taro from '@tarojs/taro'
import { STORAGE_KEY } from '@/config/constants'
import { getRoutes } from '@/config/api'

const ROUTES = getRoutes()

// 步骤1：获取puk
const getPuk = async () => {
  const { data } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.LOGIN,
    method: 'GET',
  })
  return data // puk
}

// 步骤2：获取code
const getWxCode = async (): Promise<string> => {
  const { code } = await Taro.login()
  return code
}

// 步骤3：检查授权状态
const checkAuth = async (): Promise<boolean> => {
  const { authSetting } = await Taro.getSetting()
  return !!authSetting['scope.userInfo']
}

// 步骤4：发送到开发者服务器
const sendToServer = async (code: string) => {
  const { data } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.LOGIN,
    method: 'POST',
    data: { code },
  })
  return data // token
}

// 完整登录流程
export const login = async (): Promise<void> => {
  // 1. 获取puk，并存储
  const resPuk = Taro.getStorageSync(STORAGE_KEY.PUK) || (await getPuk())
  if (!resPuk) return
  Taro.setStorageSync(STORAGE_KEY.PUK, resPuk.data)

  // 2. 检查本地token
  const token = Taro.getStorageSync(STORAGE_KEY.TOKEN)
  if (token) return

  // 3. 获取微信code
  const code = await getWxCode()

  // 4. 检查授权状态
  const isAuthed = await checkAuth()
  if (!isAuthed) {
    console.warn(new Error('需要用户主动授权'))
    return
  }

  // 5. 发送到服务端
  const resToken = await sendToServer(code)
  if (!resToken) return
  console.log(resToken)

  // 6. 存储登录态
  Taro.setStorageSync(STORAGE_KEY.TOKEN, resToken.token)

  return
}

// export const logout = (): void => {
//   Taro.removeStorageSync(STORAGE_KEY.TOKEN)
// }
