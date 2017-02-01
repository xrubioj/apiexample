const fs = require('fs')
const Router = require('koa-router')

module.exports = (api, core) => {
  let router = Router({
    prefix: '/'
  })

  api
    .use(router.routes())
    .use(router.allowedMethods())

  router.get('/', (ctx) => {
    ctx.body = 'Hello'
  })

  var list = fs.readdirSync(__dirname)
  list.forEach(function (file) {
    if (file.indexOf('.js') >= 0 && file !== 'index.js') {
      require('./' + file)(api, core)
    }
  })
}
