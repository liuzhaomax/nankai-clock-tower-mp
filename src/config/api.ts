const ENV = process.env.NODE_ENV || 'development'

export const getRoutes = () => {
  const devRoutes = {
    BASE_URL: `https://blood.liuzhaomax.cn`,
  }
  const prodRoutes = {
    BASE_URL: `https://blood.liuzhaomax.cn`,
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
