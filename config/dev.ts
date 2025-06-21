require('dotenv').config({ path: '../.env.development' })

module.exports = {
  env: {
    NODE_ENV: '"development"',
    BASE_URL: `"${process.env.BASE_URL}"`,
  },
  defineConstants: {},
  mini: {},
  h5: {},
}
