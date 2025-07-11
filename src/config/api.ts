const ENV = process.env.NODE_ENV || 'development'

export const getRoutes = () => {
  const devRoutes = {
    BASE_URL: `https://blood.liuzhaomax.cn`,
    LOGIN: '/login',
    USER_AVATAR: '/user/avatar',
    USER_NICK_NAME: '/user/nickName',
    USER_USER: '/user/user',
  }
  const prodRoutes = {
    BASE_URL: `https://blood.liuzhaomax.cn`,
    LOGIN: '/login',
    USER_AVATAR: '/user/avatar',
    USER_NICK_NAME: '/user/nickName',
    USER_USER: '/user/user',
  }
  switch (ENV) {
    case 'development':
      return devRoutes
    case 'production':
      return prodRoutes
    default:
      return devRoutes
  }
}
