import { getRoutes } from '@/config/api'
import Taro from '@tarojs/taro'

interface GroupRes {
  id: number
  name: string
  score: number
}
export const postCreateGroup = async (name: string): Promise<GroupRes> => {
  const ROUTES = getRoutes()
  const { data, statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.GROUP.CREATE,
    method: 'POST',
    data: { name },
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
  return data.data
}

export const patchJoinGroup = async (name: string): Promise<GroupRes> => {
  const ROUTES = getRoutes()
  const { data, statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.GROUP.JOIN,
    method: 'PATCH',
    data: { name },
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
  return data.data
}

export const deleteQuitGroup = async (name: string): Promise<void> => {
  const ROUTES = getRoutes()
  const { statusCode, errMsg } = await Taro.request({
    url: ROUTES.BASE_URL + ROUTES.GROUP.QUIT,
    method: 'DELETE',
    data: { name },
  })
  if (statusCode !== 200) {
    throw new Error(`API错误: ${statusCode}: ${errMsg}`)
  }
}
