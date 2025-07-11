import { getRoutes } from '@/config/api'
import Taro from '@tarojs/taro'
import { STORAGE_KEY } from '@/config/constants'

export const postAvatar = async (avatar: string) => {
  const ROUTES = getRoutes()
  const token = Taro.getStorageSync(STORAGE_KEY.TOKEN)
  const userId = Taro.getStorageSync(STORAGE_KEY.USER_ID)
  // uploadFile是独立API，不会携带拦截器的header
  const { data, statusCode, errMsg } = await Taro.uploadFile({
    url: ROUTES.BASE_URL + ROUTES.USER_AVATAR,
    filePath: avatar,
    name: 'file',
    header: {
      Authorization: token,
      user_id: userId,
    },
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
  return JSON.parse(data).data
}

export const patchNickName = async (nickName: string) => {
  const ROUTES = getRoutes()
  const { data, statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.USER_NICK_NAME,
    method: 'PATCH',
    data: { nickName },
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
  return data.data
}
