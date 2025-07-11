import Taro from '@tarojs/taro'
import { STORAGE_KEY } from '@/config/constants'
import { getRoutes } from '@/config/api'
import JsEncrypt from 'jsencrypt'

const ROUTES = getRoutes()

// 步骤1：获取puk
const getPuk = async () => {
  const { data, statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.LOGIN,
    method: 'GET',
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
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
  const rsa = new JsEncrypt()
  const puk = atob(Taro.getStorageSync(STORAGE_KEY.PUK))
  rsa.setPublicKey(puk)
  const { data, statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.LOGIN,
    method: 'POST',
    data: { code: rsa.encrypt(code) },
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
  return data // token
}

// 登录流程
export const login = async (): Promise<void> => {
  // 1. 检查本地token
  const token = Taro.getStorageSync(STORAGE_KEY.TOKEN)
  if (token) return

  // 2. 获取puk，并存储
  const resPuk = await getPuk()
  if (!resPuk) throw new Error('Puk响应payload不存在')
  Taro.setStorageSync(STORAGE_KEY.PUK, resPuk.data)

  // 3. 获取微信code
  const code = await getWxCode()

  // 4. 检查授权状态
  const isAuthed = await checkAuth()
  if (!isAuthed) throw new Error('需要用户主动授权')

  // 5. 发送到服务端
  const resToken = await sendToServer(code)
  if (!resToken) throw new Error('Token响应payload不存在')

  // 6. 存储登录态
  if (resToken.data) {
    Taro.setStorageSync(STORAGE_KEY.TOKEN, resToken.data.token)
    Taro.setStorageSync(STORAGE_KEY.USER_ID, resToken.data.userId)
  }

  return
}

// 获取用户头像昵称
export interface User {
  userId: string
  avatar: string
  nickName: string
}
export const getUserUser = async (): Promise<User> => {
  const ROUTES = getRoutes()
  const { data, statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.USER_USER,
    method: 'GET',
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
  return data.data
}

// export const logout = (): void => {
//   Taro.removeStorageSync(STORAGE_KEY.TOKEN)
// }
